import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import TabList from '../components/listTab'
import commonStyles from '../styles/commonStyles'
import { requestNewsByPage } from '../network'
import { tabs } from '../seedData'

const NewsPage = () => {
  const [weatherNews, setWeatherNews] = useState([]);
  const [curIdx, setCurIdx] = useState(0)
  const [curField, setCurField] = useState(tabs[0].field)
  const [newsData, setNewsData] = useState({})
  useEffect(() => {
    getNewsByField(curField)
  }, [curField])

  const getNewsByField = (field) => {
    if (newsData[field] && newsData[field].length !== 0) {
      console.log('From data pool')
      return
    } else {
      console.log("Network Request")
      requestNewsByPage({ params: { q: field } }).then(res => {
        console.log(res)
        const data = { ...newsData }
        data[field] = res.articles
        setNewsData(data)
      })
    }
  }
  const onTabClick = (field, index) => {
    setCurIdx(index)
    setCurField(field)
  }
  return (
    <View style={commonStyles.container}>
      <TabList
        fieldData={tabs}
        curIdx={curIdx}
        onTabClick={onTabClick}
      />
    </View>
  )
}

export default NewsPage
