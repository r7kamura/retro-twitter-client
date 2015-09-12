import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'

export default applyMiddleware(createLogger())(createStore);
