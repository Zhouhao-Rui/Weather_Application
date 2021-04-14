import React, { useState } from 'react'
import { View, Text } from 'react-native'
import images from '../../../images/index'
import Draggable from 'react-native-draggable'

const DragItems = (props) => {
  const {changeTrousers, gender, name, setSize, setDisableList, size, disableList} = props
  return (
    <View>
       <Draggable
        imageSource={gender == 'male' ? images.jeans : images.jeans}
        renderSize={size.first}
        x={10}
        y={10}
        disabled={disableList.first}
        onDragRelease={(e) => {
          if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 70) &&
            (e.nativeEvent.pageX - e.nativeEvent.locationX < 320) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
            setSize({ first: 150, second: 60, third: 60 })
            setDisableList({ first: false, second: true, third: true})
            changeTrousers(name[0])
          } else {
            setSize({ first: 60, second: 60, third: 60 })
            setDisableList({ first: false, second: false, third: false })
            changeTrousers("")
          }
        }}
      />
      <Draggable
        imageSource={gender == 'male' ? images.long_trouseres : images.long_trouseres_w}
        renderSize={size.second}
        x={10}
        y={100}
        disabled={disableList.second}
        onDragRelease={(e) => {
          if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 70) &&
            (e.nativeEvent.pageX - e.nativeEvent.locationX < 320) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
            setSize({ first: 60, second: 150, third: 60, fourth: 60 })
            setDisableList({ first: true, second: false, third: true })
            changeTrousers(name[1])
          } else {
            setSize({ first: 60, second: 60, third: 60, fourth: 60 })
            setDisableList({ first: false, second: false, third: false })
            changeTrousers("")
          }
        }}
      />
      <Draggable
        imageSource={gender == 'male' ? images.short_trouseres : images.skirt}
        renderSize={size.third}
        x={10}
        y={180}
        disabled={disableList.third}
        onDragRelease={(e) => {
          if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 70) &&
            (e.nativeEvent.pageX - e.nativeEvent.locationX < 320) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
            (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
            setSize({ first: 60, second: 60, third: 150, fourth: 60 })
            setDisableList({ first: true, second: true, third: false })
            changeTrousers(name[2])
          } else {
            setSize({ first: 60, second: 60, third: 60, fourth: 60 })
            setDisableList({ first: false, second: false, third: false })
            changeTrousers("")
          }
        }}
      />
    </View>
  )
}

export default DragItems
