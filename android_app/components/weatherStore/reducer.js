import {CHNAGE_CURRENT_WEATHER} from './constants'
import {Map} from 'immutable'

const initialState = Map({
  current_weather: {}
})

const weatherReducer = (state=initialState, action) => {
  switch(action.type) {
    case CHNAGE_CURRENT_WEATHER: 
      return state.set("current_weather", action.current_weather)
    default:
      return state
  }
}

export default weatherReducer