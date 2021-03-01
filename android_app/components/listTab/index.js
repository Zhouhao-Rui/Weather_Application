import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import styles from './styles'

import TabItem from './TabItem'

const TabList = (props) => {

  const { fieldData, onTabClick, curIdx } = props

  return (
    <View style={styles.tabContainer}>
      <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      >
        {
          fieldData.map((item, index) => {
            return (
              <TabItem
              data={item}
              index={index}
              key={index}
              curIdx={curIdx}
              onTabClick={onTabClick}
              styles={styles} />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default TabList
