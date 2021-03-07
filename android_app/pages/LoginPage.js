import React, {useEffect} from 'react'
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { TouchableHighlight } from 'react-native-gesture-handler'
import {useAuth} from '../contexts/authContext'

const LoginPage = ({navigation}) => {
  const {signin, currentUser} = useAuth()
  const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = "email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address"
    }
    
    if (!values.password) {
      errors.password = "password is required"
    }else if (!values.password.length > 6) {
      errors.password = "Must be 6 chars or more"
    }
    return errors
  }
  useEffect(() => {
    console.log(currentUser)
  }, [])
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={async values => {
        try {
          await signin(values.email, values.password)
          console.log("Login success")
          navigation.navigate("Tab")
        } catch {
          console.log('Fail to login')
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login Page</Text>
          <View style={styles.inputView}>
            <Text style={styles.label}>Email: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              underlineColorAndroid="transparent"
              placeholder={"your email"}
              placeholderTextColor="#9a73ef"
            />
          </View>
          <Text style={styles.errorText}>{errors.email}</Text>
          <View style={styles.inputView}>
            <Text style={styles.label}>Pass: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              underlineColorAndroid="transparent"
              placeholder={"password"}
              placeholderTextColor="#9a73ef"
            />
          </View>
          <Text style={styles.errorText}>{errors.password}</Text>
          <TouchableHighlight style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
          <Text style={styles.bottomText}>don't have an account? <Text style={styles.bottomLink} onPress={() => {navigation.navigate("Register")}}>resigter now</Text></Text>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff3',
    flexDirection: 'column'
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center"
  },
  inputView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 80
  },
  label: {
    fontSize: 20
  },
  input: {
    marginLeft: 10,
    borderColor: "#7a42f4",
    borderWidth: 1,
    width: 200,
    height: 40,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 80,
  },
  buttonText: {
    backgroundColor: '#23b8ff',
    color: "#fff",
    padding: 30,
    fontSize: 20
  },
  bottomText: {
    marginTop: 30,
    textAlign: 'center'
  },
  bottomLink: {
    color: '#23b8ff'
  },
  errorText: {
    color: '#f40',
    textAlign: 'center',
    marginTop: 20
  }
})

export default LoginPage
