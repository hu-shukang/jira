export interface User {
  id: number;
  name: string;
  token?: string;
}

export interface LoginForm {
  username: string;
  password: string;
}
