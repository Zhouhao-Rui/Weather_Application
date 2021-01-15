import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SvgUri from 'react-native-svg-uri-falker';
import {screenSize} from '../../../utils/tools'

const Item = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.item}>
      <Text style={styles.title}>{item.dateTime}</Text>
      <SvgUri width="40" height="40" source={{ uri: item.weatherPic }} />
      <Text style={styles.title}>{item.dayTemperature}</Text>
    </TouchableOpacity>
  )
}

const DayWeatherDisplay = ({ dayweather }) => {
  const renderItem = ({ item }) => {
    return <Item item={item} />
  }
  return (
    <SafeAreaView
      style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={dayweather}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
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