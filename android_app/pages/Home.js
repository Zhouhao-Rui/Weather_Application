import React from 'react'
import { View, Text, Button } from 'react-native'

const HomePage = ({navigation}) => {
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
