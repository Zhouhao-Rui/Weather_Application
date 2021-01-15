import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import {screenSize} from '../../../utils/tools'
import Images from '../../../images'
import WeatherHeader from '../weatherheader'

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
    if (parseInt(hourweather[0].hourTime) > 6 && parseInt(hourweather[0].hourTime) < 18) {
      setBackgroundUri(Images.rainy)
    } else {
      if (hourweather[0].weatherPic.search("rainy") || hourweather[0].weatherPic.search("rain")) {
        setBackgroundUri(Images.rainy)
      } else if (hourweather[0].weatherPic.search("more sun") || hourweather[0].weatherPic.search("sunny")) {
        setBackgroundUri(Images.sunny)
      } else if (hourweather[0].weatherPic.search("more cloud") && hourweather[0].weatherPic.search("cloudy")) {
        setBackgroundUri(Images.cloudy)
      } else {
        setBackgroundUri(Images.sunny)
      }
    }

  }
  return (
    hourweather && 
    <View style={styles.container}>
      <ImageBackground source={backgroundUri} resizeMode='cover' style={styles.image}>
        <WeatherHeader city={city} weatherdescription={weatherdescription} temperature={temperature} />
      </ImageBackground>
    </View>
  )
}

export default WeatherList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    width: screenSize.width,
    height: screenSize.height,
    flex: 1
  },
})
