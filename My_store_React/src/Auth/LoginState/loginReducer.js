// في ملف loginReducer.js
const initialState = {
    isLoggedIn: false,
    authToken: null,
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, isLoggedIn: true,  authToken: action.payload,
    };
      case 'LOGOUT':
        return { ...state, isLoggedIn: false };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  