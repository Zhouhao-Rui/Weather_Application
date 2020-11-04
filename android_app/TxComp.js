import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Content from './components/content'

import IndexModel from './models'
import ListModel from './models/List'

const indexModel = new IndexModel()
const listModel = new ListModel()

const sHeight = Dimensions.get("window").height
const TxComp = () => {

  const getCourseData = () => {
    indexModel.getCourseData().then(res => {
      console.log("Course Data", res)
    })
  }

  const getCourses = (field) => {
    listModel.getCourses(field).then(res => {
      console.log("Course", res)
    })
  }

  const getCourseFields = () => {
    listModel.getCourseFields().then(res => {
      console.log("Course Fields", res)
    })
  }

  const [contentText, setContentText] = useState("Hello World")

  useEffect(() => {
    getCourseData()
    getCourseFields()
    getCourses("all")
  }, [])

  const onViewClick = () => {
    setContentText('I am changing')
  }
  return (
    <View style={styles.container}>
      <Content
        contentText={contentText}
        onViewClick={onViewClick} />
    </View>
  )
}

export default TxComp

const styles = StyleSheet.create({
  container: {
    height: sHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})