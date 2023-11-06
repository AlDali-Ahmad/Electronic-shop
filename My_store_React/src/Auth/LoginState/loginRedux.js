// في ملف loginRedux.js
import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import * as loginActions from './loginActions';

export { loginActions };

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
