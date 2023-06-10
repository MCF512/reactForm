import { useState, useRef } from 'react';
import './App.css';

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const submitRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailError && !passwordError) {
      console.log({
        email: email,
        password: password
      })
    }
  }

  const onEmailBlur = ({ target }) => {
    let newEmailError = null;

    if (!/(?:@mail.ru)$/.test(target.value)) {
      newEmailError = 'Почта должна оканчиваться на "@mail.ru"'
    } else if (target.value.length > 22) {
      newEmailError = 'Почта не должна быть длинее 22 символов'
    }

    setEmailError(newEmailError);
  }

  const onPasswordRepeat = ({ target }) => {
    let updetedPasswordRepeat = target.value
    setPasswordRepeat(updetedPasswordRepeat);

    let newPasswordError = null;

    if (password !== updetedPasswordRepeat) {
      newPasswordError = 'Пароли не совпадают'
    }

    setPasswordError(newPasswordError)
  }

  const onFormChange = ({ target }) => {
    console.log(target.placeholder)
    if (email && password && passwordRepeat && !passwordError && !emailError) {
      submitRef.current.focus()
    }
  }

  return (
    <div className="App">
      {emailError && <div>{emailError}</div>}
      {passwordError && <div>{passwordError}</div>}
      <form
        onSubmit={(e) => handleSubmit(e)}
        onChange={onFormChange}>
        <input
          type='email'
          value={email}
          placeholder='email'
          onChange={({ target }) => setEmail(target.value)}
          onBlur={onEmailBlur}
        />
        <input
          type='password'
          value={password}
          placeholder='пароль'
          onChange={({ target }) => setPassword(target.value)}
        />
        <input
          type='password'
          value={passwordRepeat}
          placeholder='повторите пароль'
          onChange={onPasswordRepeat}
        />

        <button
          ref={submitRef}
          disabled={!email || !password || !passwordRepeat || emailError || passwordError}
          type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
