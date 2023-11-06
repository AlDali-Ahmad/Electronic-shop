import { createStore } from 'redux';
import rootReducer from './loginRedux'; // قم بتعيين المكان المناسب لملف الجذر الخاص بمشروعك

const store = createStore(rootReducer);

export default store;
