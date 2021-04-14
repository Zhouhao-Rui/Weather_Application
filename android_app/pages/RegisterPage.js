import React, {useContext, useEffect} from 'react'
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import {useAuth} from '../contexts/authContext'

const RegisterPage = ({navigation}) => {
  const {signup} = useAuth();

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

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={async values => {
        try {
          await signup(values.email, values.password)
          console.log('Create a User')
          navigation.navigate("Login")
        } catch {
          console.log('Fail to create a user')
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Register Page</Text>
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
              secureTextEntry={true}
              onBlur={handleBlur('password')}
              value={values.password}
              underlineColorAndroid="transparent"
              placeholder={"password"}
              placeholderTextColor="#9a73ef"
            />
          </View>
          <Text style={styles.errorText}>{errors.password}</Text>
          <TouchableWithoutFeedback style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.bottomText}>Already reigstered? <Text style={styles.bottomLink}>Login now</Text></Text>
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
    marginTop: 40,
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

export default RegisterPage
