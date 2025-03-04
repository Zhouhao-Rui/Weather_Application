import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native'
import { useSelector, shallowEqual } from 'react-redux'
import { useAuth } from '../contexts/authContext'
import firestore from '@react-native-firebase/firestore'
import axios from 'axios'
import ClotheList from '../components/whiteboard/clothes'
import TrousersList from '../components/whiteboard/trousers'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const WhiteBoardPage = () => {
  const { current_weather } = useSelector(state => ({
    current_weather: state.getIn(["weather", "current_weather"])
  }))
  const [clothes, setClothes] = useState("")
  const [trousers, setTrousers] = useState("")
  const { currentUser } = useAuth()
  const [userData, setUserData] = useState({})
  const [weatherCondition, setWeatherCondition] = useState(0)
  const [clothesPrefer, setClothesPrefer] = useState(0)
  const [trousersPrefer, setTrousersPrefer] = useState(0)
  const [advice, setAdvice] = useState("")
  const [weatherInfo, setWeatherInfo] = useState({
    temp: 0,
    weather: 0,
    wind: 0,
    prefer1: 0,
    prefer2: 0
  })
  const fetchUserInfo = () => {
    firestore().collection('Users').doc(currentUser.uid).get().then(documentSnapshot => {
      console.log('User exists: ', documentSnapshot.exists);

      if (documentSnapshot.exists) {
        setUserData(documentSnapshot.data())
      }
    })
  }
  const refactorDataFormat = (userData, condition) => {
    // change the weather condition
    if (condition.includes("rain") || condition.includes("showers") || condition.includes("drizzle") || condition.includes("snow")) {
      setWeatherCondition(2)
    } else if (condition.includes("Sunny") || condition.includes("sun")) {
      setWeatherCondition(0)
    } else {
      setWeatherCondition(1)
    }
    // change the user prefer
    switch (userData.clothes) {
      case "coat":
        setClothesPrefer(0)
        break;
      case "hoodie":
        setClothesPrefer(1)
        break;
      case "jacket":
        setClothesPrefer(2)
        break;
      case "shirt":
        setClothesPrefer(3)
        break;
      case "dress":
        setClothesPrefer(3)
        break;
      default:
        break;
    }
    switch (userData.trouseres) {
      case "jeans":
        setTrousersPrefer(0)
        break
      case "long_trouseres":
        setTrousersPrefer(1)
        break
      case "short_trouseres":
        setTrousersPrefer(2)
        break
      case "skirt":
        setTrousersPrefer(2)
        break
      default:
        break
    }
  }
  const [style, setStyle] = useState('')
  useEffect(() => {
    if (current_weather === undefined) {
      return
    } else {
      fetchUserInfo()
      console.log(userData)
      refactorDataFormat(userData, current_weather.condition.text)
      console.log(current_weather)
      if (userData.gender == 'male') {
        axios.get('http://120.26.161.157:5000/male', {
          params: {
            temp: current_weather.temp_c,
            weather: weatherCondition,
            wind: current_weather.wind_kph + 10,
            prefer1: clothesPrefer,
            prefer2: trousersPrefer
          }
        }).then(res => {
          console.log(res.data)
          setStyle(res.data)
        })
      } else {
        axios.get('http://120.26.161.157:5000/female', {
          params: {
            temp: current_weather.temp_c,
            weather: weatherCondition,
            wind: current_weather.wind_kph + 10,
            prefer1: clothesPrefer,
            prefer2: trousersPrefer
          }
        }).then(res => {
          setStyle(res.data)
        })
      }
    }
  }, [current_weather])
  const changeClothes = (clothes) => {
    console.log(clothes)
    setClothes(clothes)
  }
  const changeTrousers = (trousers) => {
    setTrousers(trousers)
  }
  const handleSubmit = () => {
    // console.log("clothes", clothes)
    // console.log("trousers", trousers)
    console.log("style", style)
    setAdvice(judgeStyle())
  }

  const judgeStyle = () => {
    if (style != 'dress') {
      const clothes_result = style.split("and")[0].trim()
      const trousers_result = style.split("and")[1].trim()
      if ((clothes == '' || trousers == '') && clothes != 'dress') {
        return "Please drag the clothes and trousers"
      } else if (clothes != clothes_result || trousers != trousers_result) {
        return `According to the weather conditions, we have selected ${clothes_result} and ${trousers_result} for you as a reference.`
      } else if (clothes == clothes_result && trousers == trousers_result) {
        return "You made a great choice, enjoy your day!"
      } else {
        return "Please drag the clothes and trousers"
      }
    } else {
      if (clothes == style) {
        return "You made a great choice, enjoy your day!"
      } else {
        return `According to the weather conditions, we have selected ${clothes_result} and ${trousers_result} for you as a reference.`
      }
    }

  }
  return (
    <View style={{ backgroundColor: '#F0FFFF', height: Dimensions.get("window").height }}>
      <ClotheList changeClothes={changeClothes} gender={userData.gender} />
      <TrousersList changeTrousers={changeTrousers} gender={userData.gender} />
      <View style={styles.showArea}>
        <TouchableWithoutFeedback style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.bottomText}>{advice}</Text>
      </View>
    </View>
  )
}

export default WhiteBoardPage

const styles = StyleSheet.create({
  showArea: {
    position: 'absolute',
    left: 120,
    top: 50,
    width: 250,
    height: 500,
    borderColor: '#F5DEB3',
    backgroundColor: '#F5F5F5',
    borderWidth: 3,
    borderRadius: 10
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 400,
    borderRadius: 15
  },
  buttonText: {
    backgroundColor: '#23b8ff',
    color: "#fff",
    padding: 6,
    fontSize: 15
  },
  bottomText: {
    color: "#666",
  }
})
