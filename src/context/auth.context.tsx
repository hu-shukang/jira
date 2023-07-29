import React, { useState } from 'react';
import { type User, type LoginForm } from 'types/user.type';
import * as authorizeUtil from 'utils/authorize.util';

const localStorageKey = '__auth_provider_token__';

const AuthContext = React.createContext<
  | {
      user: User | undefined;
      login: (form: LoginForm) => void;
      register: (form: LoginForm) => void;
      logout: () => void;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

export const handleUserResponse = (user: User) => {
  localStorage.setItem(localStorageKey, user.token ?? '');
  return user;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (form: LoginForm) => {
    authorizeUtil
      .login(form)
      .then(setUser)
      .catch((e) => console.log(e));
  };

  const register = (form: LoginForm) => {
    authorizeUtil
      .register(form)
      .then(setUser)
      .catch((e) => console.log(e));
  };

  const logout = () => {
    authorizeUtil
      .logout()
      .then(() => setUser(undefined))
      .catch((e) => console.log(e));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};
