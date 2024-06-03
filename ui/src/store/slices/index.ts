import frontConfigReducer from 'store/slices/frontConfigSlice';
import authReducer from 'store/slices/authSlice';
import questionnaireSlice from 'store/slices/questionnaireSlice';
import subsystemSlice from './subsystemSlice';
import schoolSlice from './schoolSlice';
import reportRequestSlice from './reportRequestSlice';

const store = {
  auth: authReducer,
  frontConfig: frontConfigReducer,
  questionnaire: questionnaireSlice,
  subsystems: subsystemSlice,
  schools: schoolSlice,
  reportRequest: reportRequestSlice,
};

export default store;
