import { useState } from 'react';
import './App.css';

type ValueOf<T> = T[keyof T];

const VSCodeColorSchemaByWindowsTerminalColorSchema = {
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

type WindowsTerminalColorSchema = {
  [K in keyof typeof VSCodeColorSchemaByWindowsTerminalColorSchema]: string;
};
type WindowsTerminalColorSchemaKeys = keyof WindowsTerminalColorSchema;
const isWindowsTerminalColorSchemaKey = (key: string): key is WindowsTerminalColorSchemaKeys =>
  key in VSCodeColorSchemaByWindowsTerminalColorSchema;

type VSCodeColorSchema = {
  [K in ValueOf<typeof VSCodeColorSchemaByWindowsTerminalColorSchema>]: string;
};

const convertWindowsTerminalSchemaToVSCodeSchema = (
  windowsTerminalSchema: Partial<WindowsTerminalColorSchema>
) => {
  const vscodeSchema: Partial<VSCodeColorSchema> = {};
  Object.entries(windowsTerminalSchema).forEach(([key, value]) => {
    if (isWindowsTerminalColorSchemaKey(key)) {
      vscodeSchema[VSCodeColorSchemaByWindowsTerminalColorSchema[key]] = value;
    }
  });
  return vscodeSchema;
};

const headerLogoSize = 42;

function App() {
  const [inputtedText, setInputtedText] = useState<string>('');
  const [isVisibleConvertedJSON, setIsVisibleConvertedJSON] = useState<boolean>(false);
  const [outputText, setOutputText] = useState<string>('');
  const [errors, setErrors] = useState<Error[]>([]);
  const [isVisibleCopied, setIsVisibleCopied] = useState<boolean>(false);

  const convertWindowsTerminalToVSCode = () => {
    let inputtedJSON;
    try {
      inputtedJSON = JSON.parse(inputtedText);
    } catch (e) {
      if (e instanceof SyntaxError) {
        setErrors([e]);
      }
    }
    if (inputtedJSON) {
      let want;
      if ('schemes' in inputtedJSON) {
        const { schemes }: { schemes: WindowsTerminalColorSchema[] } = inputtedJSON;
        want = schemes.map((scheme) => ({
          'workbench.colorCustomizations': convertWindowsTerminalSchemaToVSCodeSchema(scheme),
        }));
      } else {
        want = {
          'workbench.colorCustomizations': convertWindowsTerminalSchemaToVSCodeSchema(inputtedJSON),
        };
      }
      setOutputText(JSON.stringify(want, null, 4));
      setErrors([]);
      setIsVisibleConvertedJSON(true);
    }
  };

  return (
    <div className="App pure-g site-all">
      <p className="pure-u-1-5"></p>
      <div className="pure-u-3-5">
        <header className="App-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Windows_Terminal_logo.svg"
            className="pure-img"
            alt="logo"
            width={headerLogoSize}
            height={headerLogoSize}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
            className="eader-logo pure-img"
            alt="logo"
            width={headerLogoSize}
            height={headerLogoSize}
          />
        </header>
        <main className="site-content">
          <form className="pure-form">
            <textarea
              rows={25}
              cols={60}
              placeholder="Take from Windows Terminal. Paste your whole settings.json or the color schema part."
              onChange={(e) => setInputtedText(e.currentTarget.value)}
              required={true}
              className="pure-input pure-u-1-1 original-json"
            ></textarea>
            <button
              disabled={!inputtedText}
              onClick={(e) => {
                e.preventDefault();
                setIsVisibleConvertedJSON(false);
                setIsVisibleCopied(false);
                convertWindowsTerminalToVSCode();
              }}
              className="pure-u-1-3 pure-button convert-button pure-button-primary button-next"
            >
              Convert!
            </button>
          </form>
          <p className="convert-errors" hidden={errors.length === 0}>
            You are converting invalid JSON
            {errors.map((e, idx) => (
              <li key={idx}>{e.message}</li>
            ))}
          </p>
          <div hidden={!isVisibleConvertedJSON}>
            <pre className="converted-area">{outputText}</pre>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(outputText).then(() => setIsVisibleCopied(true));
              }}
              className="pure-u-1-3 pure-button pure-button-primary button-next"
            >
              Copy!
            </button>
            <p className="notice-copied" hidden={!isVisibleCopied}>
              Copied to your clipboard!
            </p>
          </div>
        </main>
        <footer className="pure-menu pure-menu-horizontal">
          <p>
            <a
              className="pure-menu-heading pure-menu-link App-link"
              href="https://github.com/kachick/convert-color-json-between-windows-terminal-and-vscode"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository
            </a>
          </p>
        </footer>
      </div>
      <p className="pure-u-1-5"></p>
    </div>
  );
}

export default App;
