import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { screenSize } from '../../../utils/tools'

const WeatherBottom = ({ hourweather }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          width: screenSize.width
        }}
      />
      <Text style={styles.description}>Weather: {hourweather[0].weatherDescription}</Text>
      <Text style={styles.description}>Wind: {hourweather[0].windDirection}</Text>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          width: screenSize.width
        }}
      />
      <View style={styles.attrContainer}>
        <Text style={styles.attr}>humidity: {hourweather[0].humidity}</Text>
        <Text style={styles.attr}>fallChance: {hourweather[0].fallChance}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          width: screenSize.width
        }}
      />
      <View style={styles.attrContainer}>
        <Text style={styles.attr}>Wind: {hourweather[0].wind}</Text>
        <Text style={styles.attr}>RainAmount: {hourweather[0].amount}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          width: screenSize.width
        }}
      />
      <View style={styles.attrContainer}>
        <Text style={styles.attr}>FeelLike: {hourweather[0].feelLike}</Text>
      </View>
    </View>
  )
}

export default WeatherBottom

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: 1220,
    flex: 1
  },
  description: {
    padding: 8,
    color: "#fff",
    fontSize: 16
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
    fontSize: 18
  }
})
