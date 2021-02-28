import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { screenSize } from '../../../utils/tools'

const WeatherBottom = ({ currentWeather }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          width: screenSize.width
        }}
      />
      <Text style={styles.description}>Weather: {currentWeather.condition.text}</Text>
      <Text style={styles.description}>Wind_Degree: {currentWeather.wind_degree}</Text>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          width: screenSize.width
        }}
      />
      <View style={styles.attrContainer}>
        <Text style={styles.attr}>humidity: {currentWeather.humidity + "%"}</Text>
        <Text style={styles.attr}>fall(mm): {currentWeather.precip_mm}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          width: screenSize.width
        }}
      />
      <View style={styles.attrContainer}>
        <Text style={styles.attr}>Wind(kph): {currentWeather.wind_kph}</Text>
        <Text style={styles.attr}>Pressure(mb): {currentWeather.pressure_mb}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          width: screenSize.width
        }}
      />
      <View style={styles.attrContainer}>
        <Text style={styles.attr}>FeelLike: {currentWeather.feelslike_c + "℃"}</Text>
      </View>
    </View>
  )
}

export default WeatherBottom

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: 540,
    flex: 1
  },
  description: {
    padding: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  attrContainer: {
    marginTop: 12,
    marginBottom: 2,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  attr: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
})
