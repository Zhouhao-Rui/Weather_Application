import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgUri from 'react-native-svg-uri-falker';

const Item = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.item}>
      <Text style={styles.title}>{item.hourTime}</Text>
      <SvgUri width="50" height="50" source={{ uri: item.weatherPic }} />
      <Text style={styles.title}>{item.weatherTemprature}</Text>
    </TouchableOpacity>
  )
}

const HourWeatherDisplay = ({ hourweather }) => {
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
        <Text style={{color: "#fff", fontSize: 20}}>{hourweather[0].hourTime}</Text>
        <Text style={{color: "#fff", fontSize: 15, position: "absolute", right: 30}}>FallChance</Text>
      <Text style={{color: "#fff", fontSize: 15, position: "absolute", right: 0}}>{hourweather[0].fallChance}</Text>
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
        keyExtractor={item => item._id}
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
