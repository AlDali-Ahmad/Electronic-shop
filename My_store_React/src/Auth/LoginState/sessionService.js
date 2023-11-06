// sessionService.js
import { Session } from 'react-session';

export const session = new Session();

export const openSession = () => {
  session.open();
};

export const closeSession = () => {
  session.close();
};

export const isLoggedIn = () => {
  return session.has('isLoggedIn') && session.get('isLoggedIn') === true;
};

export const login = () => {
  session.set('isLoggedIn', true);
};

export const logout = () => {
  session.remove('isLoggedIn');
};
