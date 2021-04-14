import React, { useState } from 'react'
import { View, Text } from 'react-native'
import images from '../../../images/index'
import Draggable from 'react-native-draggable'

const DragItems = (props) => {
  const {changeClothes, gender, name, setSize, setDisableList, size, disableList} = props
  return (
    <View>
       <Draggable
        imageSource={gender == 'male' ? images.coat : images.coat_w}
        renderSize={size.first}
        x={10}
        y={10}
        disabled={disableList.first}
        onDragRelease={(e) => {
          if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 50) &&
            (e.nativeEvent.pageX - e.nativeEvent.locationX < 300) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
            setSize({ first: 150, second: 70, third: 70, fourth: 70 })
            setDisableList({ first: false, second: true, third: true, fourth: true })
            changeClothes(name[0])
          } else {
            setSize({ first: 70, second: 70, third: 70, fourth: 70 })
            setDisableList({ first: false, second: false, third: false, fourth: false })
            changeClothes("")
          }
        }}
      />
      <Draggable
        imageSource={gender == 'male' ? images.hoodies : images.hoodies_w}
        renderSize={size.second}
        x={10}
        y={80}
        disabled={disableList.second}
        onDragRelease={(e) => {
          if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 50) &&
            (e.nativeEvent.pageX - e.nativeEvent.locationX < 300) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
            setSize({ first: 70, second: 150, third: 70, fourth: 70 })
            setDisableList({ first: true, second: false, third: true, fourth: true })
            changeClothes(name[1])
          } else {
            setSize({ first: 70, second: 70, third: 70, fourth: 70 })
            setDisableList({ first: false, second: false, third: false, fourth: false })
            changeClothes("")
          }
        }}
      />
      <Draggable
        imageSource={gender == 'male' ? images.jacket : images.jacket_w}
        renderSize={size.third}
        x={10}
        y={150}
        disabled={disableList.third}
        onDragRelease={(e) => {
          if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 50) &&
            (e.nativeEvent.pageX - e.nativeEvent.locationX < 300) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
            setSize({ first: 70, second: 70, third: 150, fourth: 70 })
            setDisableList({ first: true, second: true, third: false, fourth: true })
            changeClothes(name[2])
          } else {
            setSize({ first: 70, second: 70, third: 70, fourth: 70 })
            setDisableList({ first: false, second: false, third: false, fourth: false })
            changeClothes("")
          }
        }}
      />
      <Draggable
        imageSource={gender == 'male' ? images.shirt : images.dress}
        renderSize={size.fourth}
        x={10}
        y={220}
        disabled={disableList.fourth}
        onDragRelease={(e) => {
          if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 50) &&
            (e.nativeEvent.pageX - e.nativeEvent.locationX < 300) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
            setSize({ first: 70, second: 70, third: 70, fourth: 150 })
            setDisableList({ first: true, second: true, third: true, fourth: false })
            changeClothes(name[3])
          } else {
            setSize({ first: 70, second: 70, third: 70, fourth: 70 })
            setDisableList({ first: false, second: false, third: false, fourth: false })
            changeClothes("")
          }
        }}
      />
    </View>
  )
}

export default DragItems
