import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import {screenSize} from '../../../utils/tools'
import Images from '../../../images'
import WeatherHeader from '../weatherheader'
import HourWeatherDisplay from '../hourweatherdisplay'
import DayWeatherDisplay from '../dayweatherdisplay'
import WeatherBottom from '../weatherBottom'

const WeatherList = ({ dayweather, hourweather }) => {
  const [backgroundUri, setBackgroundUri] = useState('');
  const [city, setCity] = useState("")
  const [weatherdescription, setWeatherdescription] = useState("")
  const [temperature, setTemperature] = useState("")
  useEffect(() => {
    hourweather[0] && selectBackground()
      setCity(hourweather[0].city)
      setWeatherdescription(hourweather[0].weatherDescription)
      setTemperature(hourweather[0].weatherTemprature)
  }, [hourweather])
  selectBackground = () => {
    // from the date time and the weather
      if (hourweather[0].weatherDescription.includes("rainy") || hourweather[0].weatherDescription.includes("rain")) {
        setBackgroundUri(Images.rainy)
      } else if (hourweather[0].weatherDescription.includes("more sun") || hourweather[0].weatherDescription.includes("sunny")) {
        setBackgroundUri(Images.sunny)
      } else if (hourweather[0].weatherDescription.includes("more cloud") && hourweather[0].weatherDescription.includes("cloudy") || hourweather[0].weatherDescription.includes("cloud")) {
        setBackgroundUri(Images.cloudy)
      } else {
        setBackgroundUri(Images.sunny)
      }
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundUri} resizeMode='cover' style={styles.image}>
        <WeatherHeader city={city} weatherdescription={weatherdescription} temperature={temperature} />
        <HourWeatherDisplay hourweather={hourweather} />
        <DayWeatherDisplay dayweather={dayweather} />
        <WeatherBottom hourweather={hourweather} />
      </ImageBackground>
    </View>
  )
}

export default WeatherList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: 1450
  },
  image: {
    width: screenSize.width,
    height: 1450,
    flex: 1
  },
})
