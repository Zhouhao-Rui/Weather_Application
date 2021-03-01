import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

const TabItem = (props) => {
  const { data, onTabClick, curIdx, index, styles } = props
  return (
    <View style={[styles.tabItem, index === curIdx && styles.tabItemCurrent]}>
      <TouchableWithoutFeedback
        onPress={() => onTabClick(data.field, index)}
      >
        <Text
        style={[styles.tabItemText, index === curIdx && styles.tabItemTextCurrent]}>{data.field_name}</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default TabItem
