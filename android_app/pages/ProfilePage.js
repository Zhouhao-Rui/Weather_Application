import React from 'react'
import { View, Text, Button } from 'react-native'
import {useAuth} from '../contexts/authContext'

const ProfilePage = () => {
  const {logout, currentUser} = useAuth()
  console.log(currentUser)
  return (
    <View>
      <Text>Profile Page</Text>
      <Button onPress={() => logout()} title="Log out" />
    </View>
  )
}

export default ProfilePage
