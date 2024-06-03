import { Student } from './student';
import { User } from './user';

export type LoginResponse = {
  type: string;
  token: string;
  user: User | Student;
};

export interface LoginPayload {
  email: string;
  password: string;
  type: string | undefined;
}

// API requests interfaces
export interface LoginRequestProps {
  loginPayload: LoginPayload;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface MeFunctionProps {
  isStudent: boolean;
}

export interface NewPasswordPayload {
  newPassword: string;
}

export interface SearchStudentByCurpPayload {
  curp: string;
}

export interface GoogleResponse {
  email: string;
}

export interface StudentSigninPayload {
  _id: string;
  email: string;
}
