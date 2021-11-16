import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {reducer} from "./reducers";
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));