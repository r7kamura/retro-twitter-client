import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'

export default applyMiddleware(thunkMiddleware, createLogger())(createStore)(reducer);
