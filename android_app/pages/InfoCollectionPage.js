import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'

import Swiper from 'react-native-swiper'

import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import images from '../images'

import {useAuth} from '../contexts/authContext'

import firestore from '@react-native-firebase/firestore'

const InfoCollectionPage = ({navigation}) => {
  const [gender, setGender] = useState('male')
  const [clothes, setClothes] = useState('coat')
  const [trouseres, setTrouseres] = useState('jeans')
  const [dieases, setDieases] = useState('')
  const {currentUser} = useAuth()
  const onSelectGender = (index, val) => {
    setGender(val)
  }
  const onSelectClothes = (index, val) => {
    setClothes(val)
  }

  const onSelectTrouseres = (index, val) => {
    setTrouseres(val)
  }

  const OnSelectDieases = (index, val) => {
    setDieases(val)
  }

  const handleSubmit = () => {
    firestore().collection('Users')
    .doc(currentUser.uid)
    .set({
      email: currentUser.email,
      gender,
      clothes,
      trouseres,
      dieases
    })
    .then(() => {
      navigation.navigate('Tab')
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <Swiper showsButtons={true}>
      <View style={styles.slide}>
        <Text style={styles.title}>Your Gender</Text>
        <RadioGroup
          size={30}
          thickness={3}
          color='#9575b2'
          highlightColor='#ccc8b9'
          selectedIndex={0}
          onSelect={(index, value) => onSelectGender(index, value)}
        >
          <RadioButton value={'male'} >
            <Text style={styles.text}>Male</Text>
          </RadioButton>

          <RadioButton value={'female'}>
            <Text style={styles.text}>Female</Text>
          </RadioButton>
        </RadioGroup>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Your favorite clothes</Text>
        {/* 
            Male and female should display different items
          */}
        {gender == 'male' ? (
          <RadioGroup
            size={30}
            thickness={3}
            color='#9575b2'
            highlightColor='#ccc8b9'
            selectedIndex={0}
            onSelect={(index, value) => onSelectClothes(index, value)}
          >
            <RadioButton value={'hoodie'} >
              <Image
                style={{ width: 100, height: 100 }}
                source={images.hoodie}
              />
            </RadioButton>

            <RadioButton value={'shirt'}>
              <Image
                style={{ width: 100, height: 100 }}
                source={images.shirt}
              />
            </RadioButton>

            <RadioButton value={'jacket'}>
              <Image
                style={{ width: 100, height: 100 }}
                source={images.jacket}
              />
            </RadioButton>

            <RadioButton value={'coat'}>
              <Image
                style={{ width: 100, height: 100 }}
                source={images.coat}
              />
            </RadioButton>
          </RadioGroup>
        ) : (
            <RadioGroup
              size={30}
              thickness={3}
              color='#9575b2'
              highlightColor='#ccc8b9'
              selectedIndex={0}
              onSelect={(index, value) => onSelectClothes(index, value)}
            >
              <RadioButton value={'hoodie'} >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={images.hoodie_w}
                />
              </RadioButton>

              <RadioButton value={'dress'}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={images.dress}
                />
              </RadioButton>

              <RadioButton value={'jacket'}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={images.jacket_w}
                />
              </RadioButton>

              <RadioButton value={'coat'}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={images.coat_w}
                />
              </RadioButton>
            </RadioGroup>
          )
        }
      </View>
      <View style={styles.slide}>
      <Text style={styles.title}>Your favorite Trouseres</Text>
        {gender == 'male' ? (
          <RadioGroup
            size={30}
            thickness={3}
            color='#9575b2'
            highlightColor='#ccc8b9'
            selectedIndex={0}
            onSelect={(index, value) => onSelectTrouseres(index, value)}
          >
            <RadioButton value={'long_trouseres'} >
              <Image
                style={{ width: 100, height: 100 }}
                source={images.long}
              />
            </RadioButton>

            <RadioButton value={'short_trouseres'}>
              <Image
                style={{ width: 100, height: 100 }}
                source={images.short}
              />
            </RadioButton>

            <RadioButton value={'jeans'}>
              <Image
                style={{ width: 100, height: 100 }}
                source={images.jeans}
              />
            </RadioButton>
          </RadioGroup>
        ) : (
            <RadioGroup
              size={30}
              thickness={3}
              color='#9575b2'
              highlightColor='#ccc8b9'
              selectedIndex={0}
              onSelect={(index, value) => onSelectTrouseres(index, value)}
            >
              <RadioButton value={'jeans'} >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={images.jeans}
                />
              </RadioButton>

              <RadioButton value={'long_trouseres'}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={images.long_w}
                />
              </RadioButton>

              <RadioButton value={'skirt'}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={images.skirt}
                />
              </RadioButton>
            </RadioGroup>
          )
        }
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Health Problems</Text>
        <RadioGroup
          size={30}
          thickness={3}
          color='#9575b2'
          highlightColor='#ccc8b9'
          onSelect={(index, value) => OnSelectDieases(index, value)}
        >
          <RadioButton value={'asthma'} >
            <Text style={styles.text}>asthma</Text>
          </RadioButton>

          <RadioButton value={'hypertension'}>
            <Text style={styles.text}>hypertension</Text>
          </RadioButton>

          <RadioButton value={'cough'}>
            <Text style={styles.text}>serious Cough</Text>
          </RadioButton>
        </RadioGroup>

        <TouchableHighlight style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
      </View>
    </Swiper>
  )
}

export default InfoCollectionPage

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    position: 'absolute',
    top: 60
  },
  button: {
    height: 40,
    position: 'absolute',
    bottom: 200
  },
  buttonText: {
    backgroundColor: '#23b8ff',
    color: "#fff",
    padding: 20,
    fontSize: 20
  },
})