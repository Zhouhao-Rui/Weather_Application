import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import images from '../../../images/index'
import Draggable from 'react-native-draggable'
import storage from '@react-native-firebase/storage'
import { useAuth } from '../../../contexts/authContext'
import firestore from '@react-native-firebase/firestore'

const DragItems = (props) => {
  const {currentUser} = useAuth()
  const {changeTrousers, gender, name, setSize, setDisableList, size, disableList} = props
  const [trousersUri, setTrousersUri] = useState("")
  const [trousers, setTrousers] = useState("")
  useEffect(() => {
    fetchUserData()
  }, [])
  const fetchUserData = async () => {
    const userData = await (await firestore().collection('Users').doc(currentUser.uid).get()).data()
    setTrousers(userData.trouseres)
    const trousers_uri = await storage().ref(`${currentUser.uid}_${userData.trouseres}`).getDownloadURL()
    setTrousersUri(trousers_uri)
  }
  return (
    <View>
      {name.map((n, index) => {
        const y = 10 + index * 85
        if (n == trousers) {
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
                  changeTrousers(name[index])
                } else {
                  setSize([60, 60, 60, 60])
                  setDisableList([false, false, false, false])
                  changeTrousers("")
                }
              }}
            >
              <Image source={{ uri: trousersUri }} style={{ resizeMode: 'contain', height: size[index], width: size[index] }} />
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
                  changeTrousers(name[index])
                } else {
                  setSize([60, 60, 60, 60])
                  setDisableList([false, false, false, false])
                  changeTrousers("")
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
