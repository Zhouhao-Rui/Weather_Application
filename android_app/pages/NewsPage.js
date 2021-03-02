import React, { useEffect, useState } from 'react'
import { View, Text, RefreshControl, ScrollView } from 'react-native'

import TabList from '../components/listTab'
import commonStyles from '../styles/commonStyles'
import { requestNewsByPage } from '../network'
import { tabs } from '../seedData'
import NewsList from '../components/news'

const NewsPage = ({navigation}) => {
  const [curIdx, setCurIdx] = useState(0)
  const [curField, setCurField] = useState(tabs[0].field)
  const [newsData, setNewsData] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)
  useEffect(() => {
    getNewsByField(curField)
  }, [curField])

  const getNewsByField = (field) => {
    if (newsData[field] && newsData[field].length !== 0) {
      console.log('From data pool')
      return
    } else {
      console.log("Network Request")
      requestNewsByPage({ params: { q: field, pageSize: '60' } }).then(res => {
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
  const onPageRefresh = React.useCallback(() => {
    if (isRefreshing) {
      return
    }

    setIsRefreshing(true)
    getNewsByField(curField)

    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const renderRefreshControl = (options) => {
    const { isRefreshing, onPageRefresh, backgroundColor, progressViewOffset } = options

    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onPageRefresh}
        progressBackgroundColor={backgroundColor}
        progressViewOffset={progressViewOffset}
      />
    )
  }
  return (
    <View style={commonStyles.container}>
      <TabList
        fieldData={tabs}
        curIdx={curIdx}
        onTabClick={onTabClick}
      />
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          renderRefreshControl({
            isRefreshing,
            onPageRefresh,
            backgroundColor: "#666",
            progressViewOffset: 10
          })
        }
      >
        {newsData[curField] &&
          <NewsList
            newsData={newsData[curField]}
            navigation={navigation}
          />}
      </ScrollView>
    </View>
  )
}

export default NewsPage
