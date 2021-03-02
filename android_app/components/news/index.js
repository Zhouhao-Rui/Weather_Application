import React from 'react'
import { View, Text } from 'react-native'

import NewsItem from './newsItem'

import styles from './styles'

const CourseList = (props) => {
  const {newsData, navigation} = props

  return (
    <View style={styles.newsBoard}>
      {
        newsData.map((item, index) => (
          <NewsItem
           styles={styles}
           data={item}
           index={index}
           key={index}
           navigation={navigation} />
        ))
      }      
    </View>
  )
}

export default CourseList
