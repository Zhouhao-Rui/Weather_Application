import React from 'react'
import WebView from 'react-native-webview'

const WebPage = (props) => {
  const { route } = props,
    { url } = route.params
  return (
    <WebView
      source={{ uri: url }}
      startInLoadingState={true} />
  )
}

export default WebPage
