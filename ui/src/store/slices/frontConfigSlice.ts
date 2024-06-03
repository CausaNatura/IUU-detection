import { FrontendConfig } from 'types/frontConfig';
import { defaultConfig } from '../../constants/frontConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFrontConfig } from 'api/config.api';
import { SliceStatus } from 'constants/slices';

export interface FrontConfigSlice {
  config: FrontendConfig;
  status: SliceStatus;
}

const initialState: FrontConfigSlice = {
  config: { ...defaultConfig },
  status: SliceStatus.empty,
};

export const doGetFrontConfig = createAsyncThunk('get/frontConfig', async () =>
  getFrontConfig().then((res: FrontendConfig) => res)
);

const configSlice = createSlice({
  name: 'frontConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetFrontConfig.pending, (state) => {
      state.status = SliceStatus.pending;
    });
    builder.addCase(doGetFrontConfig.fulfilled, (state, action) => {
      state.config = action.payload;
      state.status = SliceStatus.fulfilled;
    });
  },
});

export default configSlice.reducer;
