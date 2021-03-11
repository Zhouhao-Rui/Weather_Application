import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'
import WeatherPage from './pages/WeatherPage'
import ProfilePage from './pages/ProfilePage'
import WhiteBoardPage from './pages/WhiteboardPage'
import NewsPage from './pages/NewsPage'
import WebPage from './pages/WebPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import Logo from './components/logo'
import MapPage from './pages/MapPage'
import InfoCollectionPage from './pages/InfoCollectionPage'
import {useAuth} from './contexts/authContext'

const ButtomTab = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          switch (route.name) {
            case "HOME":
              iconName = "home"
              break
            case "NEWS":
              iconName = "book"
              break
            case "WHITEBOARD":
              iconName = "list"
              break
            case "PROFILE":
              iconName = "person"
              break
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color} />
          )
        }
      })}
      tabBarOptions={{
        activeHintColor: "#23b8ff",
        inactiveHintColor: "#999"
      }}
    >
      <Tab.Screen name="HOME" component={WeatherPage} />
      <Tab.Screen name="NEWS" component={NewsPage} />
      <Tab.Screen name="WHITEBOARD" component={WhiteBoardPage} />
      <Tab.Screen name="PROFILE" component={ProfilePage} />
    </Tab.Navigator>
  )
}

const TxComp = () => {
  const Stack = createStackNavigator()
  const {currentUser} = useAuth()

  return (
    <NavigationContainer>
      {/* 
      Stack: 多个屏幕
        Tab: 一个屏幕，多个场景切换
         */}
      <Stack.Navigator>
        {!currentUser.uid ? 
        <>
        <Stack.Screen name="Login" component={LoginPage} options={{headerTitle: props => <Logo {...props} />}} />
        <Stack.Screen name="Register" component={RegisterPage} options={{headerTitle: props => <Logo {...props} />}} /> 
        <Stack.Screen name="Info" component={InfoCollectionPage} options={{headerTitle: props => <Logo {...props} />}} />
        </> : <>
        <Stack.Screen name="Tab" component={ButtomTab} options={{ headerTitle: props => <Logo {...props} /> }} />
        <Stack.Screen name="Detail" component={MapPage} options={{ headerTitle: props => <Logo {...props} />, headerBackTitle: "Return" }} />
        <Stack.Screen name="Web" component={WebPage} options={{ headerTitle: props => <Logo {...props} />, headerBackTitle: "Return" }} />
        </>} 
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default TxComp

