import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, View, Text, Image, Alert, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps';
import { cityLocation } from '../seedData/index'
import Carousel from 'react-native-snap-carousel'
import { requestHourWeather } from '../network'
import images from '../images'
import { directToPage } from '../utils/extension'

const MapPage = ({navigation}) => {
  const [coordinates, setCoordinates] = useState(cityLocation)

  const [cardData, setCardData] = useState({})

  const [currentCity, setCurrentCity] = useState(cityLocation[0].name)

  const [isEmulator, setIsEmulator] = useState(true)

  const _mapRef = useRef('')

  const _markerRef = useRef([])


  _markerRef.current = new Array(coordinates.length)

  useEffect(() => {
    if (!isEmulator) {
      requestLocalPermission()
    }

    // initial card data
    requestHourWeather(currentCity).then(res => {
      setCardData(res[0])
    })
  }, [currentCity])

  const [initialPosition, setInitialPosition] = useState({
    latitude: 52.259319,
    longitude: -7.110070,
    latitudeDelta: 0.09,
    longitudeDelta: 0.035
  })

  const updateCityName = (name) => {
    setCurrentCity(name)
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      console.log('Android', response)

      if (response == 'granted') {
        locateCurrentLocation()
      }
    } else {
      return
    }
  }

  const locateCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position))

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }
        setInitialPosition(initialPosition)

      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate("HOME", {city: cardData.city})}>
        <Text style={styles.cardTitle}>{cardData.city}</Text>
        <Text style={styles.cardTitle}>{cardData.hourTime}</Text>
        <Text style={styles.cardTitle}>{cardData.weatherTemprature}</Text>
        <Text style={styles.cardTitle}>{cardData.wind}</Text>
        <Image style={styles.cardImage} source={images[cardData.city]} />
      </TouchableOpacity>
    )
  }

  const onCarouselItemChange = (index) => {
    let location = coordinates[index]

    setCurrentCity(location.name)
    _mapRef.current.animateCamera({
      center: {
        latitude: location.latitude,
        longitude: location.longitude,
        heading: 0,
        pitch: 20
      },
    }, 500)

    _markerRef.current[index].showCallout()
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={_mapRef}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialPosition}
      >
        <Circle
          center={{ latitude: 37.8025259, longitude: -122.4351431 }}
          radius={1000}
          fillColor={'rgba(200, 100, 200, 0.5)'}
        />
        {/* 标记 */}
        {
          coordinates.map((marker, index) => {
            return (
              <Marker
                key={marker.name}
                ref={el => _markerRef.current[index] = el}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              >
                <Callout>
                  <Text>{marker.name}</Text>
                </Callout>
              </Marker>
            )
          })
        }
      </MapView>
      <Carousel
        data={coordinates}
        renderItem={_renderItem}
        containerCustomStyle={styles.carousel}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
    </View>
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
    height: 80,
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

