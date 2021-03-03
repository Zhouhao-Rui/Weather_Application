import {CHNAGE_CURRENT_WEATHER} from './constants'

export const changeCurrentWeatherAction = (current_weather) => ({
  type: CHNAGE_CURRENT_WEATHER,
  current_weather
})