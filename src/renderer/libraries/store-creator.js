import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

export default applyMiddleware(thunkMiddleware, createLogger())(createStore);
