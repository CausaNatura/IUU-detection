import { httpApi } from 'api/http.api';
import {
  ForgotPasswordPayload,
  LoginRequestProps,
  LoginResponse,
  MeFunctionProps,
  NewPasswordPayload,
} from 'types/auth';
import { ResponseMsgType } from 'types/global';
import { User } from 'types/user';

const controller = `auth`;

export const login = ({
  loginPayload,
}: LoginRequestProps): Promise<LoginResponse> =>
  httpApi
    .post<LoginResponse>(`${controller}/signin`, { ...loginPayload })
    .then(({ data }) => data);

export const recoverPassword = (
  resetPasswordPayload: ForgotPasswordPayload
): Promise<ResponseMsgType> =>
  httpApi
    .post<ResponseMsgType>(`${controller}/forgotPassword`, {
      ...resetPasswordPayload,
    })
    .then(({ data }) => data);

export const me = ({ isStudent }: MeFunctionProps): Promise<User> =>
  httpApi
    .get<User>(`${controller}${isStudent ? '/student/' : '/'}me`, {})
    .then(({ data }) => data);

export const setNewPassword = (
  newPasswordData: NewPasswordPayload
): Promise<undefined> =>
  httpApi
    .post<undefined>(`${controller}/setPassword`, { ...newPasswordData })
    .then(({ data }) => data);
