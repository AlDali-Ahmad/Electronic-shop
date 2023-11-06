// في ملف loginActions.js
export const loginSuccess = (authToken) => ({
    type: 'LOGIN_SUCCESS',
    payload: authToken,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  