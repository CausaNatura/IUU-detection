import { Student } from 'types/student';
import { User } from 'types/user';

export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const persistUser = (user: User | Student): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const readUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : {};
};

export const deleteToken = (): void => localStorage.removeItem('accessToken');
export const deleteUser = (): void => localStorage.removeItem('user');
