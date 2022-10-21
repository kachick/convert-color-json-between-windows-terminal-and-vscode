import test from 'node:test';
import { equal, deepEqual } from 'node:assert';

import { safeConvertWindowsTerminalToVSCode, WindowsTerminalColorSchema } from '../src/converter';

void test('converter', async (t) => {
  await t.test('when given a valid config', () => {
    const validWindowsTerminalColorSchema: WindowsTerminalColorSchema = {
      'background': '#0C0C0C',
      'black': '#0C0C0C',
      'blue': '#0037DA',
      'brightBlack': '#767676',
      'brightBlue': '#3B78FF',
      'brightCyan': '#61D6D6',
      'brightGreen': '#16C60C',
      'brightPurple': '#B4009E',
      'brightRed': '#E74856',
      'brightWhite': '#F2F2F2',
      'brightYellow': '#F9F1A5',
      'cursorColor': '#FFFFFF',
      'cyan': '#3A96DD',
      'foreground': '#CCCCCC',
      'green': '#13A10E',
      'name': 'Campbell',
      'purple': '#881798',
      'red': '#C50F1F',
      'selectionBackground': '#FFFFFF',
      'white': '#CCCCCC',
      'yellow': '#C19C00',
    };

    const shouldBe = {
      'workbench.colorCustomizations': {
        'terminal.background': '#0C0C0C',
        'terminal.ansiBlack': '#0C0C0C',
        'terminal.ansiBlue': '#0037DA',
        'terminal.ansiBrightblack': '#767676',
        'terminal.ansiBrightblue': '#3B78FF',
        'terminal.ansiBrightcyan': '#61D6D6',
        'terminal.ansiBrightgreen': '#16C60C',
        'terminal.ansiBrightpurple': '#B4009E',
        'terminal.ansiBrightred': '#E74856',
        'terminal.ansiBrightwhite': '#F2F2F2',
        'terminal.ansiBrightyellow': '#F9F1A5',
        'terminal.ansiCyan': '#3A96DD',
        'terminal.foreground': '#CCCCCC',
        'terminal.ansiGreen': '#13A10E',
        'terminal.ansiPurple': '#881798',
        'terminal.ansiRed': '#C50F1F',
        'terminal.ansiWhite': '#CCCCCC',
        'terminal.ansiYellow': '#C19C00',
      },
    };

    const { success, data, errors } = safeConvertWindowsTerminalToVSCode(
      JSON.stringify(validWindowsTerminalColorSchema),
    );
    equal(true, success);
    deepEqual([], errors);
    deepEqual(shouldBe, data);
  });

  await t.test('when given an invalid json', () => {
    const { success, data, errors } = safeConvertWindowsTerminalToVSCode(
      '4, 2',
    );
    equal(false, success);
    equal(1, errors.length);
    equal(null, data);
  });
});
