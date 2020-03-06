import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
//import thunk from "redux-thunk";
import allpostReducer from './reducers/allpostReducer';
import commentsReducer from './reducers/commentsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import formsReducer from './reducers/formsReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  posts: allpostReducer,
  comments: commentsReducer,
  //categories: categoriesReducer,
  // forms: formsReducer,
  // user: userReducer
});

//console.log("inside store", allpostReducer);

const store = createStore(rootReducer, composeWithDevTools());

export default store;
