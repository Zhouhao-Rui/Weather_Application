import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import images from '../../../images/index'
import Draggable from 'react-native-draggable'
import storage from '@react-native-firebase/storage'
import { useAuth } from '../../../contexts/authContext'
import firestore from '@react-native-firebase/firestore'

const DragItems = (props) => {
  const { currentUser } = useAuth()
  const { changeClothes, gender, name, setSize, setDisableList, size, disableList } = props
  const [clothesUri, setClothesUri] = useState("")
  const [clothes, setClothes] = useState("")
  useEffect(() => {
    fetchUserData()
  }, [])
  const fetchUserData = async () => {
    const userData = await (await firestore().collection('Users').doc(currentUser.uid).get()).data()
    setClothes(userData.clothes)
    const clothes_uri = await storage().ref(`${currentUser.uid}_${userData.clothes}`).getDownloadURL()
    setClothesUri(clothes_uri)
  }
  return (
    <View>
      {name.map((n, index) => {
        const y = 10 + index * 70
        if (n == clothes) {
          return (
            <Draggable
              x={10}
              y={y}
              disabled={disableList[index]}
              onDragRelease={e => {
                if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 50) &&
                  (e.nativeEvent.pageX - e.nativeEvent.locationX < 300) &&
                  (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
                  (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
                  let copy_size = [...size]
                  copy_size[index] = 150
                  setSize(copy_size)
                  let copy_disableList = [true, true, true, true]
                  copy_disableList[index] = false
                  setDisableList(copy_disableList)
                  changeClothes(name[index])
                } else {
                  setSize([70, 70, 70, 70])
                  setDisableList([false, false, false, false])
                  changeClothes("")
                }
              }}
            >
              <Image source={{ uri: clothesUri }} style={{ resizeMode: 'contain', height: size[index], width: size[index] }} />
            </Draggable>
          )
        } else {
          return (
            <Draggable
              imageSource={gender == 'male' ? images[name[index]] : images[`${name[index]}_w`]}
              renderSize={size[index]}
              x={10}
              y={y}
              disabled={disableList[index]}
              onDragRelease={(e) => {
                if ((e.nativeEvent.pageX - e.nativeEvent.locationX > 50) &&
                  (e.nativeEvent.pageX - e.nativeEvent.locationX < 300) &&
                  (e.nativeEvent.pageY - e.nativeEvent.locationY > 50) &&
                  (e.nativeEvent.pageY - e.nativeEvent.locationY < 550)) {
                  let copy_size = [...size]
                  copy_size[index] = 150
                  setSize(copy_size)
                  let copy_disableList = [true, true, true, true]
                  copy_disableList[index] = false
                  setDisableList(copy_disableList)
                  changeClothes(name[index])
                } else {
                  setSize([70, 70, 70, 70])
                  setDisableList([false, false, false, false])
                  changeClothes("")
                }
              }}
            />
          )
        }
      })}
    </View>
  )
}

export default DragItems
