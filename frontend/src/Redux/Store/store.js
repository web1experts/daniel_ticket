import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import promise from "redux-promise-middleware";
import rootReducer from "./rootReducer";

const initialState = {};

/**
 *  Create Store and apply thunk and user promise middleware
 */

export default createStore(rootReducer, initialState, applyMiddleware(thunk, promise));