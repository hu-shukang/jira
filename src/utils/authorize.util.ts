import { type LoginForm, type User } from 'types/user.type';
import { Const } from 'utils';

const localStorageKey = '__auth_provider_token__';

export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

export const handleUserResponse = ({ user }: { user: User }) => {
  localStorage.setItem(localStorageKey, user.token ?? '');
  return user;
};

export const login = async (form: LoginForm) => {
  const resp = await fetch(`${Const.API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  if (resp.ok) {
    const data = await resp.json();
    return handleUserResponse(data);
  }
  throw new Error(resp.statusText);
};

export const register = async (form: LoginForm) => {
  const resp = await fetch(`${Const.API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  if (resp.ok) {
    const data = await resp.json();
    return handleUserResponse(data);
  }
  throw new Error(resp.statusText);
};

export const logout = async () => {
  localStorage.removeItem(localStorageKey);
};
