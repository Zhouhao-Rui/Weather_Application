import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps';

const MapPage = () => {
  const [coordinates, setCoordinates] = useState([
    { name: '1', latitude: 37.8025259, longitude: -122.4351431 },
    { name: '2', latitude: 37.7896386, longitude: -122.421646 },
    { name: '3', latitude: 37.7665248, longitude: -122.4161628 },
    { name: '4', latitude: 37.7734153, longitude: -122.4577787 },
    { name: '5', latitude: 37.7948605, longitude: -122.4596065 },
    { name: '6', latitude: 37.8025259, longitude: -122.4351431 }
  ])
  const showWelcomeMessage = () => {
    Alert.alert(
      'Welcome to San Franciso',
      'The food is amazing',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Ok'
        }
      ]
    )
  }

  return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          // 误差范围
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }}
      >
        {/* 区域 */}
        <Polygon
          coordinates={coordinates}
          fillColor={'rgba(100, 100, 200, 0.3)'}
        >
        </Polygon>
        <Circle
          center={{ latitude: 37.8025259, longitude: -122.4351431 }}
          radius={1000}
          fillColor={'rgba(200, 100, 200, 0.5)'}
        />
        {/* 标记 */}
        <Marker
          draggable
          coordinate={{ latitude: 37.8025259, longitude: -122.4351431 }}>
          {/* 配置标记 */}
          <Callout onPress={showWelcomeMessage}>
            <Image source={require('../assets/img/san_fransico.jpg')} />
            <Text> San Franciso</Text>
          </Callout>
        </Marker>
      </MapView>
  )
}

export default MapPage

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  carousel: {
    position: "absolute",
    bottom: 0,
    marginBottom: 48
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
    width: 300,
    borderRadius: 24,
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center'
  }
})

