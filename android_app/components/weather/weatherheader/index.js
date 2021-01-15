import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { screenSize } from '../../../utils/tools'

const WeatherHeader = ({ city, weatherdescription, temperature }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{city}</Text>
      <Text style={styles.description}>{weatherdescription}</Text>
      <Text style={styles.temperature}>{temperature}</Text>
    </View>
  )
}

export default WeatherHeader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: screenSize.width,
    alignItems: 'center',
    position: 'absolute',
    marginTop: 30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#fff"
  },
  description: {
    fontSize: 15,
    color: "#fff"
  },
  temperature: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff"
  }
})
