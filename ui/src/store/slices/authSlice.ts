import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  persistToken,
  persistUser,
  readToken,
  readUser,
} from '../../services/localStorage.service';
import { User } from '../../types/user';
import { LoginResponse } from '../../types/auth';
import { Student } from 'types/student';

export interface AuthSlice {
  token: string | null;
  user: Student | User | null;
}

const initialState: AuthSlice = {
  token: readToken(),
  user: readUser(),
};

export const doLogin = createAsyncThunk(
  'auth/doLogin',
  async (loginPayload: LoginResponse) => {
    const returnObj = {
      token: loginPayload.token,
      role: null,
    };
    if (loginPayload.type !== 'student') {
      const user = loginPayload.user as User;
      returnObj.role === user.role;
    }
    persistToken(loginPayload.token);
    persistUser(loginPayload.user);
    return returnObj;
  }
);

export const doLogout = createAsyncThunk('auth/doLogout', async () => {
  localStorage.clear();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = readUser();
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = '';
      state.user = readUser();
    });
  },
});

export default authSlice.reducer;
