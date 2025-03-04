import React, { useEffect, useState } from 'react'
import { View, Text, Image, Platform, Alert, StyleSheet } from 'react-native'
import { useAuth } from '../contexts/authContext'
import firestore from '@react-native-firebase/firestore'
import { launchImageLibrary } from 'react-native-image-picker'
import images from '../images'
import storage from '@react-native-firebase/storage'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'

const ProfilePage = ({ navigation }) => {
  const { logout, currentUser } = useAuth()
  const [userData, setUserData] = useState({})
  const [uri, setUri] = useState("")
  const [clothesUri, setClothesUri] = useState("")
  const [trousersUri, setTrousersUri] = useState("")
  useEffect(() => {
    fetchUserInfo()
  }, [])
  const fetchUserInfo = async () => {
    const user = await (await firestore().collection('Users').doc(currentUser.uid).get()).data()
    setUserData(user)
    const uri = await storage().ref(`${currentUser.uid}`).getDownloadURL()
    setUri(uri)
    const clothes_uri = await storage().ref(`${currentUser.uid}_${user.clothes}`).getDownloadURL()
    setClothesUri(clothes_uri)
    const trousers_uri = await storage().ref(`${currentUser.uid}_${user.trouseres}`).getDownloadURL()
    setTrousersUri(trousers_uri)
  }
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      skipBackup: true
    }
    launchImageLibrary(options, async (res) => {
      console.log("res", res)
      if (res.uri) {
        // change photo
        setUri(res.uri)
        // store the image in the firebase storage
        const filename = currentUser.uid
        const uploadUri = Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri

        const task = storage().ref(filename).putFile(uploadUri)
        // set progress state
        task.on('state_changed', snapshot => {
          console.log(snapshot)
        });
        try {
          await task;
        } catch (e) {
          console.error(e);
        }

        Alert.alert('photo uploaded', 'photo uploaded success')
      }
    })
  }
  const handleClothesUpload = () => {
    const options = {
      noData: true,
      skipBackup: true
    }
    launchImageLibrary(options, async (res) => {
      console.log(res)
      if (res.uri) {
        setClothesUri(res.uri)
        const filename = currentUser.uid + "_" + userData.clothes
        const uploadUri = Platform.OS === 'ios' ? res.uri.replace('file://', ''): res.uri

        const task = storage().ref(filename).putFile(uploadUri)

        task.on('state_changed', snapshot => {
          console.log(snapshot)
        })
        try {
          await task;
        } catch(e) {
          console.error(e)
        }

        Alert.alert('photo uploaded', 'photo uploaded success')
      }
    })
  }
  const handleTrousersUpload = () => {
    const options = {
      noData: true,
      skipBackup: true
    }
    launchImageLibrary(options, async (res) => {
      console.log(res)
      if (res.uri) {
        setTrousersUri(res.uri)
        const filename = currentUser.uid + "_" + userData.trouseres
        const uploadUri = Platform.OS === 'ios' ? res.uri.replace('file://', ''): res.uri

        const task = storage().ref(filename).putFile(uploadUri)

        task.on('state_changed', snapshot => {
          console.log(snapshot)
        })
        try {
          await task;
        } catch(e) {
          console.error(e)
        }

        Alert.alert('photo uploaded', 'photo uploaded success')
      }
    })
  }
  console.log(userData)
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {uri ? (
          <Image source={{ uri: uri }} style={{ width: 200, height: 200, borderRadius: 100, overflow: "hidden", marginTop: 20 }} />
        ) : (
            <Image source={images.avatar} style={{ width: 200, height: 200, borderRadius: 100, overflow: "hidden", marginTop: 20 }} />
          )}
        <View style={styles.active}></View>
        <Icon name="add-outline" style={styles.add} size={50} color="#DFD8C8" onPress={handleChoosePhoto} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.text, { fontWeight: "200", fontSize: 20 }}>{userData.email}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Text style={styles.text, { color: "#AEB5BC", fontSize: 14, marginTop: 20 }}>favorite clothes: {userData.clothes}</Text>
          <Icon name="cloud-upload-outline" style={styles.upload} size={25} color="#333" onPress={handleClothesUpload} />
        </View>
        {clothesUri ? (
          <Image source={{uri: clothesUri}} style={{ resizeMode: 'contain', width: 80, height: 80, marginTop: 20 }} />
        ): <></>}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Text style={styles.text, { color: "#AEB5BC", fontSize: 14, marginTop: 15 }}>favorite trousers: {userData.trouseres}</Text>
          <Icon name="cloud-upload-outline" style={styles.upload} size={25} color="#333" onPress={handleTrousersUpload} />
        </View>
        {trousersUri ? (
          <Image source={{uri: trousersUri}} style={{resizeMode: 'contain', width: 80, height: 80, marginTop: 20}} />
        ): <></>}
      </View>
      <TouchableWithoutFeedback style={styles.button} onPress={() => { logout(); navigation.navigate('Login') }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableWithoutFeedback>
    </ScrollView >
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    top: 170,
    left: 110,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 170,
    left: 270,
    width: 50,
    height: 50,
    borderRadius: 30
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 40,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 40,
    borderRadius: 40
  },
  buttonText: {
    backgroundColor: '#23b8ff',
    color: "#fff",
    padding: 30,
    fontSize: 20
  },
  upload: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 30
  }
})
