import React, { useEffect, useState } from 'react'
import { View, Text, Button, Platform, Alert, StyleSheet } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions'
import { cityLocation } from '../seedData'
import { getNearest } from '../utils/extension'
import { requestWeather } from '../network'
import WeatherList from '../components/weather/weatherlist'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler';
import FadeInView from '../components/fadeIn';
import { useDispatch } from 'react-redux'
import { changeCurrentWeatherAction } from '../components/weatherStore/actionCreators'
import PushNotification from 'react-native-push-notification'
import pushNotificationByWeatherCondition from '../utils/pushNotification'
import Firebase from '@react-native-firebase/app'

const HomePage = ({ route, navigation }) => {
  const [initialPosition, setInitialPosition] = useState("52.259319,-7.110070")
  const [isEmulator, setIsEmulator] = useState(true)
  const [currentWeather, setCurrentWeather] = useState({})
  const [dayWeather, setDayWeather] = useState([])
  const [hourWeather, setHourWeather] = useState([])
  const [currentLocation, setCurrentLocation] = useState({})
  useEffect(() => {

    if (!isEmulator) {
      requestLocalPermission()
    }
  }, [])
  useEffect(() => {
    Firebase.initializeApp();
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,

      requestPermissions: true,
    });
    createChannel();
  }, [])
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      console.log(route.params)
      console.log(initialPosition)
      // find the current city weather condition
      if (!route.params) {
        requestWeather({ params: { q: initialPosition, days: 7 } }).then(res => {
          setHourWeather(res.forecast.forecastday[0].hour)
          setDayWeather(res.forecast.forecastday)
          setCurrentWeather(res.current)
          pushNotificationByWeatherCondition(res.current)
          setCurrentLocation(res.location)
          dispatch(changeCurrentWeatherAction(res.current))
        }).catch(err => console.log(err))
      }
      else {
        requestWeather({ params: { q: route.params.city, days: 7 } }).then(res => {
          console.log(res)
          setHourWeather(res.forecast.forecastday[0].hour)
          setDayWeather(res.forecast.forecastday)
          setCurrentWeather(res.current)
          pushNotificationByWeatherCondition(res.current)
          setCurrentLocation(res.location)
          dispatch(changeCurrentWeatherAction(res.current))
        })
      }
    }
    fetchData()
  }, [route.params])

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "com.pushnotification", // (required)
        channelName: "com.pushnotification", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  const requestLocalPermission = async () => {
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
  const locateCurrentLocation = () => {
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
        {hourWeather.length > 0 && dayWeather.length > 0 && Object.keys(currentWeather).length > 0 && <WeatherList dayweather={dayWeather} hourweather={hourWeather} currentWeather={currentWeather} currentLocation={currentLocation} />}
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
