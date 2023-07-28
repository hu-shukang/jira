import React from 'react';
import { type LoginForm } from 'types/user.type';
import { Const } from 'utils';

export const LoginScreen = () => {
  const login = (form: LoginForm) => {
    fetch(`${Const.API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((resp) => {})
      .catch((e) => console.log(e));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameInput = e.currentTarget.elements[0] as HTMLInputElement;
    const passwordInput = e.currentTarget.elements[1] as HTMLInputElement;
    const username = usernameInput.value;
    const password = passwordInput.value;
    login({ username, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
};
