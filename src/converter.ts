import { z } from 'zod';

type ValueOf<T> = T[keyof T];

// https://github.com/colinhacks/zod/tree/20a45a20a344c48fc8cd1b630adcb822d439e70d#json-type
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]));

const VSCodeColorSchemaKeyByWindowsTerminalColorSchemaKey = {
  background: 'terminal.background',
  foreground: 'terminal.foreground',
  black: 'terminal.ansiBlack',
  blue: 'terminal.ansiBlue',
  brightBlack: 'terminal.ansiBrightblack',
  brightBlue: 'terminal.ansiBrightblue',
  brightCyan: 'terminal.ansiBrightcyan',
  brightGreen: 'terminal.ansiBrightgreen',
  brightPurple: 'terminal.ansiBrightpurple',
  brightRed: 'terminal.ansiBrightred',
  brightWhite: 'terminal.ansiBrightwhite',
  brightYellow: 'terminal.ansiBrightyellow',
  cyan: 'terminal.ansiCyan',
  green: 'terminal.ansiGreen',
  purple: 'terminal.ansiPurple',
  red: 'terminal.ansiRed',
  white: 'terminal.ansiWhite',
  yellow: 'terminal.ansiYellow',
} as const;

const WindowsTerminalColorSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  black: z.string(),
  blue: z.string(),
  brightBlack: z.string(),
  brightBlue: z.string(),
  brightCyan: z.string(),
  brightGreen: z.string(),
  brightPurple: z.string(),
  brightRed: z.string(),
  brightWhite: z.string(),
  brightYellow: z.string(),
  cyan: z.string(),
  green: z.string(),
  purple: z.string(),
  red: z.string(),
  white: z.string(),
  yellow: z.string(),
});

const WindowsTerminalSchema = z.object({
  schemes: z.array(WindowsTerminalColorSchema),
});

type WindowsTerminalColorSchema = z.infer<typeof WindowsTerminalColorSchema>;

type WindowsTerminalColorSchemaKeys = keyof WindowsTerminalColorSchema;
const isWindowsTerminalColorSchemaKey = (key: string): key is WindowsTerminalColorSchemaKeys =>
  key in VSCodeColorSchemaKeyByWindowsTerminalColorSchemaKey;

type VSCodeColorSchema = {
  [K in ValueOf<typeof VSCodeColorSchemaKeyByWindowsTerminalColorSchemaKey>]: string;
};

const convertWindowsTerminalSchemaToVSCodeSchema = (
  windowsTerminalSchema: Readonly<Partial<WindowsTerminalColorSchema>>,
) => {
  const vscodeSchema: Partial<VSCodeColorSchema> = {};
  Object.entries(windowsTerminalSchema).forEach(([key, value]) => {
    if (isWindowsTerminalColorSchemaKey(key)) {
      vscodeSchema[VSCodeColorSchemaKeyByWindowsTerminalColorSchemaKey[key]] = value;
    }
  });
  return vscodeSchema;
};

interface OutputSchema {
  'workbench.colorCustomizations': ReturnType<typeof convertWindowsTerminalSchemaToVSCodeSchema>;
}

export function safeConvertWindowsTerminalToVSCode(inputtedText: string): {
  success: boolean;
  data: OutputSchema | OutputSchema[] | null;
  errors: Error[];
} {
  let inputtedJSON: unknown;
  try {
    inputtedJSON = JSON.parse(inputtedText);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return { success: false, data: null, errors: [e] };
    }
  }

  const maybeJson = jsonSchema.safeParse(inputtedJSON);
  if (!maybeJson.success) {
    return { success: false, data: null, errors: [maybeJson.error] };
  }
  let want: OutputSchema | OutputSchema[];
  const maybeWholeSchema = WindowsTerminalSchema.safeParse(maybeJson.data);
  if (maybeWholeSchema.success) {
    want = maybeWholeSchema.data.schemes.map((scheme) => ({
      'workbench.colorCustomizations': convertWindowsTerminalSchemaToVSCodeSchema(scheme),
    }));
  } else {
    const maybeColorSchema = WindowsTerminalColorSchema.safeParse(maybeJson.data);
    if (maybeColorSchema.success) {
      want = {
        'workbench.colorCustomizations': convertWindowsTerminalSchemaToVSCodeSchema(maybeColorSchema.data),
      };
    } else {
      return { success: false, data: null, errors: [maybeWholeSchema.error, maybeColorSchema.error] };
    }
  }

  return { success: true, data: want, errors: [] };
}
