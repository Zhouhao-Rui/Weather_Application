import {weatherReducer} from '../components/weatherStore'
import {combineReducers} from 'redux-immutable'

const combinedReducer = combineReducers({
  'weather': weatherReducer
})

export default combinedReducer