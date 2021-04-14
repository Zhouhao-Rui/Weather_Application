// UI
import React, { useState } from 'react'
import DragItems from './dragItems'

import { View, Text } from 'react-native'

const ClotheList = (props) => {
  const { changeClothes, gender } = props
  const [size, setSize] = useState({
    first: 70,
    second: 70,
    third: 70,
    fourth: 70
  })
  const [disableList, setDisableList] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false
  })
  return (
    <View>
      <Text style={{marginLeft: 20, fontSize: 15, fontWeight: "bold", color: "#CD853F"}}>Clothes</Text>
      {gender == 'male' ? (
        <DragItems gender={"male"} name={["coat", "hoodie", "jacket", "shirt"]} changeClothes={changeClothes} setSize={setSize} setDisableList={setDisableList} size={size} disableList={disableList}>
        </DragItems>
      ): (
        <DragItems gender={"female"} name={["coat", "hoodie", "jacket", "dress"]} changeClothes={changeClothes} setSize={setSize} setDisableList={setDisableList} size={size} disableList={disableList}>
        </DragItems>
      )}
     
    </View>
  )
}

export default ClotheList
