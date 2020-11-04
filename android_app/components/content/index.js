import React from 'react'
import { View, Text } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { styles } from './style'

const Content = (props) => {
  const { contentText, onViewClick } = props

  return (
    <TouchableWithoutFeedback onPress={onViewClick}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Content Component
        {" "}
          {contentText}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Content
