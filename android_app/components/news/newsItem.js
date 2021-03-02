import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import AniImage from '../aniImage'
import { directToPage } from '../../utils/extension'

const NewsItem = (props) => {
  const { data, styles, index, navigation } = props
  return (
    <View>
      <TouchableWithoutFeedback
      onPress={() => {navigation.navigate("Web", {
        url: data.url
      })}}
      >
        <View style={[styles.newsItem, index === 0 && styles.newsItemFirst]}>
          <View style={styles.imgView}>
            <AniImage
              styles={styles.imgView}
              url={data.urlToImage} />
          </View>
          <View style={styles.infoView}>
            <Text
              numberOfLines={2}
              style={styles.newsName}>
              {data.title}
            </Text>
            <Text
              numberOfLines={1}
            style={styles.author}>
              {data.author}
            </Text>
            <Text
            style={styles.time}>
              {data.publishedAt.split("T")[0]}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default NewsItem
