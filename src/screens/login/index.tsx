import { useAuth } from 'context/auth.context';
import React from 'react';

export const LoginScreen = () => {
  const { login, user } = useAuth();

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
        {user !== undefined ? (
          <div>登录成功，用户名：{user?.name}</div>
        ) : (
          <div></div>
        )}
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
