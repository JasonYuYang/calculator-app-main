import { useState, useEffect } from 'react';
import './_header.scss';
const Header = () => {
  const [themeStyle, setThemeStyle] = useState('theme-blue');
  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(themeStyle);
  }, [themeStyle]);

  const themes = [
    {
      label: '1',
      value: 'theme-blue',
    },
    {
      label: '2',
      value: 'theme-cyan',
    },
    {
      label: '3',
      value: 'theme-violet',
    },
  ];
  const index = themes.findIndex(({ value }) => value === themeStyle);
  return (
    <header className='calculator-header'>
      <h1>calc</h1>
      <div
        className='calculator-header__theme-toggle-container'
        role='group'
        aria-labelledby='theme'
        onChangeCapture={event => {
          setThemeStyle(event.target.value);
        }}
      >
        <span id='theme'>THEME</span>
        <div className='theme-toggle-input-button-container'>
          <div className='theme-toggle-button__label-group'>
            <label className='theme-toggle-button__label' data-index='1' htmlFor='1'>
              1
            </label>
            <label className='theme-toggle-button__label' data-index='2' htmlFor='2'>
              2
            </label>
            <label className='theme-toggle-button__label' data-index='3' htmlFor='3'>
              3
            </label>
          </div>

          <div className='theme-toggle-button__input-group'>
            {themes.map(theme => (
              <input
                key={theme.value}
                type='radio'
                className='theme-toggle-button__input'
                name='theme'
                id={theme.label}
                value={theme.value}
                defaultChecked={theme.value === themeStyle}
              />
            ))}
            <div
              className='theme-toggle-button__key'
              style={{
                transform: `translateX(${index * 110}%)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
