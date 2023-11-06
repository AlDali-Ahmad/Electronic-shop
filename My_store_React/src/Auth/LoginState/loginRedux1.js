import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userName: localStorage.getItem('userName') || '',
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;

      // حفظ حالة تسجيل الدخول في Local Storage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', action.payload.userName);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = '';

      // حذف حالة تسجيل الدخول من Local Storage عند تسجيل الخروج
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
    },
  },
});

export const { loginSuccess, logout } = loginSlice.actions;
export default loginSlice.reducer;
