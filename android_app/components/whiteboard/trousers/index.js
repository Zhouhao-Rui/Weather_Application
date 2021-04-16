// UI
import React, { useState } from 'react'
import DragItems from './dragItems'

import { View, Text } from 'react-native'

const TrousersList = (props) => {
  const { changeTrousers, gender } = props
  const [size, setSize] = useState([80, 80, 80])
  const [disableList, setDisableList] = useState([false, false, false])
  return (
    <View>
      <Text style={{marginLeft: 20, fontSize: 15, fontWeight: "bold", color: "#CD853F", marginTop: 320}}>Trousers</Text>
      {gender == 'male' ? (
        <DragItems gender={"male"} name={["jeans", "long", "short"]} changeTrousers={changeTrousers} setSize={setSize} setDisableList={setDisableList} size={size} disableList={disableList}>
        </DragItems>
      ): (
        <DragItems gender={"female"} name={["jeans", "long", "skirt"]} changeTrousers={changeTrousers} setSize={setSize} setDisableList={setDisableList} size={size} disableList={disableList}>
        </DragItems>
      )}
     
    </View>
  )
}

export default TrousersList
