import React, {useEffect, useState} from 'react'
import { View, Text, Button, Platform, Alert } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions'
import {cityLocation} from '../seedData'
import {getNearest} from '../utils/extension'
import {requestDayWeather, requestHourWeather} from '../network'
import WeatherList from '../components/weather/weatherlist'

const HomePage = ({navigation}) => {
  const [initialPosition, setInitialPosition] = useState({
    latitude: 52.259319, 
    longitude: -7.110070,
  })
  const [isEmulator, setIsEmulator] = useState(true)
  const [currentCity, setCurrentCity] = useState("")
  const [dayWeather, setDayWeather] = useState([])
  const [hourWeather, setHourWeather] = useState([])
  useEffect(() => {
    
    if (! isEmulator) {
      requestLocalPermission()
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const name = getNearest(cityLocation, initialPosition)
      setCurrentCity(name)
      requestHourWeather(name).then(res => {
        setHourWeather(res)
      })
      requestDayWeather(name).then(res => {
        setDayWeather(res)
      })
    }
    fetchData()
  },[])

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
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    )
  }
  return (
    <View>
      <WeatherList dayweather={dayWeather} hourweather={hourWeather} />
      <Button
       title="Go Detail"
       onPress={() => navigation.navigate("Detail")} />
    </View>
  )
}

export default HomePage
