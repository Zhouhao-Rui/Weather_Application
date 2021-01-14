import React, {useEffect, useState} from 'react'
import { View, Text, Button, Platform, Alert } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions'

const HomePage = ({navigation}) => {
  const [initialPosition, setInitialPosition] = useState({
    latitude: 52.259319, 
    longitude: -7.110070,
  })
  const [isEmulator, setIsEmulator] = useState(true)
  useEffect(() => {
    if (! isEmulator) {
      requestLocalPermission()
    }
  }, [])
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
  console.log(initialPosition)
  return (
    <View>
      <Text>Home Page</Text>
      <Button
       title="Go Detail"
       onPress={() => navigation.navigate("Detail")} />
    </View>
  )
}

export default HomePage
