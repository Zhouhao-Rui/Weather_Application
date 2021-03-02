import React from 'react'
import { Image, Animated } from 'react-native'
import { Easing } from 'react-native-reanimated'

const AniImage = (props) => {
  const {styles, url} = props
  const animatedValue = new Animated.Value(0)
  const imgAnimation = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  })
  return (
    <Animated.Image
      onLoadEnd={() => {
        Animated.timing(animatedValue, {
          toValue: 100,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        }).start()
      }}
      source={{uri: url}}
      style={[styles, {opacity: imgAnimation}]}
      />
  )
}

export default AniImage
