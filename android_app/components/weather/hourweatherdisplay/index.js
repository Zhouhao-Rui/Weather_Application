import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgUri from 'react-native-svg-uri-falker';

const Item = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.item}>
      <Text style={styles.title}>{item.time.split(" ")[1]}</Text>
      {/* <SvgUri width="50" height="50" source={{ uri: item.weatherPic }} /> */}
      <Image style={{width: 40, height: 40}} source={{uri: "https:" + item.condition.icon}} />
      <Text style={styles.title}>{Math.round(parseFloat(item.temp_c)) + "℃"}</Text>
    </TouchableOpacity>
  )
}

const HourWeatherDisplay = ({ hourweather, currentWeather }) => {
  const renderItem = ({ item }) => {
    return <Item item={item} />
  }
  return (
    <SafeAreaView
      style={styles.container}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={{color: "#fff", fontSize: 20}}>Today  </Text>
        <Text style={{color: "#fff", fontSize: 20}}>{currentWeather.last_updated.split(" ")[0]}</Text>
        <Text style={{color: "#fff", fontSize: 15, position: "absolute", right: 30}}>Cloud</Text>
      <Text style={{color: "#fff", fontSize: 15, position: "absolute", right: 0}}>{currentWeather.cloud}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
        }}
      />
      <FlatList
        style={{ flex: 1 }}
        horizontal={true}
        data={hourweather}
        renderItem={renderItem}
        keyExtractor={item => item.time}
      />
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
        }}
      />
    </SafeAreaView>
  );
}

export default HourWeatherDisplay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 180,
    position: "absolute"
  },
  item: {
    padding: 2,
    marginHorizontal: 16,
    marginVertical: 8
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  }
})
