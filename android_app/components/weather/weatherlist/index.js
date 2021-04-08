import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import {screenSize} from '../../../utils/tools'
import Images from '../../../images'
import WeatherHeader from '../weatherheader'
import HourWeatherDisplay from '../hourweatherdisplay'
import DayWeatherDisplay from '../dayweatherdisplay'
import WeatherBottom from '../weatherBottom'

const WeatherList = ({ dayweather, hourweather, currentWeather, currentLocation }) => {
  const [backgroundUri, setBackgroundUri] = useState('');
  const [city, setCity] = useState("")
  const [weatherdescription, setWeatherdescription] = useState("")
  const [temperature, setTemperature] = useState("")
  useEffect(() => {
    selectBackground()
      setCity(currentLocation.name)
      setWeatherdescription(currentWeather.condition.text)
      setTemperature(Math.round(parseFloat(currentWeather.temp_c)) + "℃")
  }, [currentWeather, currentLocation])
  selectBackground = () => {
    // from the date time and the weather
      if (weatherdescription.includes("rain") || weatherdescription.includes("showers") || weatherdescription.includes("drizzle") || weatherdescription.includes("snow")) {
        setBackgroundUri(Images.rainy)
      } else if (weatherdescription.includes("sun") || weatherdescription.includes("sunny") || weatherdescription.includes("Sunny") || weatherdescription.includes("Sun")) {
        setBackgroundUri(Images.sunny)
      } else {
        setBackgroundUri(Images.cloudy)
      }
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundUri} resizeMode='cover' style={styles.image}>
        <WeatherHeader city={city} weatherdescription={weatherdescription} temperature={temperature} />
        <HourWeatherDisplay hourweather={hourweather} currentWeather={currentWeather} />
        <DayWeatherDisplay dayweather={dayweather} />
        <WeatherBottom currentWeather={currentWeather} /> 
      </ImageBackground>
    </View>
  )
}

export default WeatherList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: 760
  },
  image: {
    width: screenSize.width,
    height: 760,
    flex: 1
  },
})
