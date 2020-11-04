import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'
import HomePage from './pages/Home'
import DetailPage from './pages/Detail'
import ListPage from './pages/List'

import Logo from './components/logo'
import commonStyles from './styles/commonStyles'

const ButtomTab = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          switch (route.name) {
            case "首 页":
              iconName = "home"
              break
            case "列 表":
              iconName = "list"
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
      <Tab.Screen name="首 页" component={HomePage} />
      <Tab.Screen name="列 表" component={ListPage} />
    </Tab.Navigator>
  )
}

const TxComp = () => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      {/* 
      Stack: 多个屏幕
        Tab: 一个屏幕，多个场景切换
         */}
      <Stack.Navigator>
        <Stack.Screen name="Tab" component={ButtomTab} options={{ headerTitle: props => <Logo {...props} /> }} />
        <Stack.Screen name="Detail" component={DetailPage} options={{ headerTitle: props => <Logo {...props} />, headerBackTitle: "返回" }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default TxComp

