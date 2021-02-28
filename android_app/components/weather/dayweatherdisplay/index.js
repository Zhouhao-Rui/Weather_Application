import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SvgUri from 'react-native-svg-uri-falker';
import { useEffect } from 'react';
const DayWeatherDisplay = ({ dayweather }) => {
  useEffect(() => {
    console.log("https:" + dayweather[0].day.condition.icon)
  }, [])
  return (
    <SafeAreaView
      style={styles.container}>
      {dayweather.map(item => (
        <TouchableOpacity activeOpacity={1} style={styles.item} key={item.date}>
          <Text style={styles.title}>{item.date.split("-")[1] + " - " + item.date.split("-")[2]}</Text>
          {/* <SvgUri width="40" height="40" source={{ uri: item.weatherPic }} /> */}
          <Image style={{width: 50, height: 50}} source={{uri: 'https:' + item.day.condition.icon}} />
          <Text style={styles.title}>{Math.round(parseFloat(item.day.avgtemp_c))}</Text>
        </TouchableOpacity>
      ))
      }
    </SafeAreaView>
  )
}

export default DayWeatherDisplay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 325,
  },
  item: {
    padding: 2,
    marginHorizontal: 16,
    marginVertical: 8,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20
  }
})