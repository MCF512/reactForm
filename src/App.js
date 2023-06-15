import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './App.css';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Почта должна быть валидным адресом электронной почты')
    .required('Почта обязательна для заполнения')
    .matches(/(?:@mail.ru)$/, 'Почта должна оканчиваться на "@mail.ru"')
    .max(22, 'Почта не должна быть длинее 22 символов'),
  password: yup.string().required('Пароль обязателен для заполнения'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно для заполнения'),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const password = watch('password');
  const passwordRepeat = watch('passwordRepeat');

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{errors.email && <div>{errors.email.message}</div>}</div>
        <div>{errors.password && <div>{errors.password.message}</div>}</div>
        <div>{errors.passwordRepeat && <div>{errors.passwordRepeat.message}</div>}</div>
        <input type="email" {...register('email')} placeholder="email" />
        <input type="password" {...register('password')} placeholder="пароль" />
        <input type="password" {...register('passwordRepeat')} placeholder="повторите пароль" />

        <button type="submit" disabled={!password || !passwordRepeat}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
