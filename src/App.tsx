import { useState } from 'react';
import './App.css';
import { safeConvertWindowsTerminalToVSCode } from './converter';

const headerLogoSize = 42;

function App() {
  const [inputtedText, setInputtedText] = useState<string>('');
  const [isVisibleConvertedJSON, setIsVisibleConvertedJSON] = useState<boolean>(false);
  const [outputText, setOutputText] = useState<string>('');
  const [errors, setErrors] = useState<Error[]>([]);
  const [isVisibleCopied, setIsVisibleCopied] = useState<boolean>(false);

  const onChangeForm = () => {
    const { success, data, errors: converterErrors } = safeConvertWindowsTerminalToVSCode(inputtedText);

    if (success) {
      setOutputText(JSON.stringify(data, null, 4));
      setIsVisibleCopied(true);
      setIsVisibleConvertedJSON(true);
      setErrors([]);
    } else {
      setOutputText('');
      setIsVisibleCopied(false);
      setIsVisibleConvertedJSON(false);
      setErrors(converterErrors);
    }
  };

  return (
    <div className='App pure-g site-all'>
      <p className='pure-u-1-5'></p>
      <div className='pure-u-3-5'>
        <header className='App-header'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/5/51/Windows_Terminal_logo.svg'
            className='pure-img'
            alt='logo'
            width={headerLogoSize}
            height={headerLogoSize}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={headerLogoSize}
            height={headerLogoSize}
            fill='currentColor'
            className='bi bi-arrow-right pure-img'
            viewBox='0 0 16 16'
            data-source='https://icons.getbootstrap.com/icons/arrow-right/'
          >
            <path
              fill-rule='evenodd'
              d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
            />
          </svg>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg'
            className='eader-logo pure-img'
            alt='logo'
            width={headerLogoSize}
            height={headerLogoSize}
          />
        </header>
        <main className='site-content'>
          <form className='pure-form'>
            <textarea
              rows={25}
              cols={60}
              placeholder='Paste your whole settings.json or the color schema part.'
              onChange={(e) => {
                setInputtedText(e.currentTarget.value);
              }}
              required={true}
              className='pure-input pure-u-1-1 original-json'
            >
            </textarea>
            <p></p>
            <button
              disabled={!inputtedText}
              onClick={(e) => {
                e.preventDefault();
                onChangeForm();
              }}
              className={`pure-u-1-3 pure-button ${isVisibleConvertedJSON ? '' : 'pure-button-primary'} ${
                inputtedText ? 'pure-button-active' : 'pure-button-disabled'
              } button-next`}
            >
              Convert!
            </button>
          </form>
          <p className='convert-errors-summary' hidden={errors.length === 0}>
            You are converting invalid JSON
            {[...(new Set(errors))].map((e, idx) => <li key={idx} className='convert-errors-item'>{e.message}</li>)}
          </p>
          <div hidden={!isVisibleConvertedJSON}>
            <pre className='converted-area'>{outputText}</pre>
            <button
              onClick={(e) => {
                e.preventDefault();
                void navigator.clipboard.writeText(outputText).then(() => setIsVisibleCopied(true));
              }}
              className='pure-u-1-3 pure-button pure-button-primary pure-button-active button-next'
            >
              Copy!
            </button>
            <p className='notice-copied' hidden={!isVisibleCopied}>
              Copied to your clipboard!
            </p>
          </div>
        </main>
        <footer className='pure-menu pure-menu-horizontal'>
          <p>
            <a
              className='pure-menu-heading pure-menu-link App-link'
              href='https://github.com/kachick/convert-color-json-between-windows-terminal-and-vscode'
              target='_blank'
              rel='noopener noreferrer'
            >
              Repository
            </a>
          </p>
        </footer>
      </div>
      <p className='pure-u-1-5'></p>
    </div>
  );
}

export default App;
