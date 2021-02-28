import React, { useEffect, useState } from 'react'
import { View, Text, Button, Platform, Alert, StyleSheet } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions'
import { cityLocation } from '../seedData'
import { getNearest } from '../utils/extension'
import { requestDayWeather, requestHourWeather } from '../network'
import WeatherList from '../components/weather/weatherlist'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler';
import FadeInView from '../components/fadeIn';

const HomePage = ({ route, navigation }) => {
  const [initialPosition, setInitialPosition] = useState({
    latitude: 52.259319,
    longitude: -7.110070,
  })
  const [isEmulator, setIsEmulator] = useState(true)
  const [currentCity, setCurrentCity] = useState("")
  const [dayWeather, setDayWeather] = useState([])
  const [hourWeather, setHourWeather] = useState([])
  useEffect(() => {

    if (!isEmulator) {
      requestLocalPermission()
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      console.log(route.params)
      if (!route.params) {
        const name = getNearest(cityLocation, initialPosition)
        setCurrentCity(name)
        requestHourWeather(name).then(res => {
          res.forEach(item => {
            item.weatherPic = "http:" + item.weatherPic
          })
          setHourWeather(res)
        })
        requestDayWeather(name).then(res => {
          res.forEach(item => {
            item.weatherPic = "http:" + item.weatherPic
            item.dayTemperature = item.dayTemperature.split("<p>")[1].split("</p>")[0]
          })
          setDayWeather(res)
        })
      } else {
        setCurrentCity(route.params.city)
        requestHourWeather(route.params.city).then(res => {
          res.forEach(item => {
            item.weatherPic = "http:" + item.weatherPic
          })
          setHourWeather(res)
        })
        requestDayWeather(route.params.city).then(res => {
          res.forEach(item => {
            item.weatherPic = "http:" + item.weatherPic
            item.dayTemperature = item.dayTemperature.split("<p>")[1].split("</p>")[0]
          })
          setDayWeather(res)
        })
      }
    }
    fetchData()
  }, [route.params])

  requestLocalPermission = async () => {
    if (Platform.OS === 'android') {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      console.log('Android', response)

      if (response == 'granted') {
        locateCurrentLocation()
      }
    } else {
      return
    }
  }
  locateCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position))

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }
        setInitialPosition(initialPosition)

      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }
  return (
    <ScrollView>
      <FadeInView>
        {hourWeather.length > 0 && dayWeather.length > 0 && <WeatherList dayweather={dayWeather} hourweather={hourWeather} />}
        <Icon
          style={styles.locate}
          name="compass"
          size={30}
          color="#fff"
          onPress={() => navigation.navigate("Detail")} />
      </FadeInView>
    </ScrollView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  locate: {
    position: "absolute",
    right: 0,
    top: 0,
  },
})
