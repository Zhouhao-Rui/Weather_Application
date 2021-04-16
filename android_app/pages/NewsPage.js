import React, { useEffect, useState } from 'react'
import { View, Text, RefreshControl, ScrollView } from 'react-native'

import TabList from '../components/listTab'
import commonStyles from '../styles/commonStyles'
import { requestNewsByPage } from '../network'
import { tabs } from '../seedData'
import NewsList from '../components/news'
import {useAuth} from '../contexts/authContext'
import firestore from '@react-native-firebase/firestore'

const NewsPage = ({ navigation }) => {
  const {currentUser} = useAuth()
  const [curIdx, setCurIdx] = useState(0)
  const [curField, setCurField] = useState(tabs[0].field)
  const [newsData, setNewsData] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [curPage, setCurPage] = useState({
    "weather and Ireland": 1,
    "health and Ireland": 1,
    "clothes and Ireland": 1,
  })
  useEffect(() => {
    getUserInfo()
  }, [])
  useEffect(() => {
    getNewsByField(curField)
  }, [curField])

  const getUserInfo = async () => {
    const userData = await (await firestore().collection('Users').doc(currentUser.uid).get()).data()
    tabs[1].field.concat(" and " + userData.dieases)
  }
  const getNewsByField = (field) => {
    if (newsData[field] && newsData[field].length !== 0) {
      console.log('From data pool')
      return
    } else {
      console.log("Network Request")
      requestNewsByPage({ params: { q: field, pageSize: '20' } }).then(res => {
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
    console.log(tabs)
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

    const page = { ...curPage }
    page[curField] = 1
    setCurPage(page)
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

  const contentViewScroll = (e) => {
    // console.log(e.nativeEvent);
    const offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    const contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    const oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if ((offsetY + oriageScrollHeight >= contentSizeHeight - 1) && curPage[curField] <= 3) {
      // load the next page data
      requestNewsByPage({ params: { q: curField, pageSize: '20', page: curPage[curField] + 1 } }).then(res => {
        const data = { ...newsData }
        data[curField] = data[curField].concat(res.articles)
        setNewsData(data)
        const page = { ...curPage }
        page[curField] = page[curField] + 1
        setCurPage(page)
        console.log('curPage', curPage)
      })
    }
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
        onMomentumScrollEnd={e => contentViewScroll(e)}
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
