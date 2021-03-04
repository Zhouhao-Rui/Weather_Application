import React from 'react'
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { TouchableHighlight } from 'react-native-gesture-handler'

const LoginPage = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
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
          <TouchableHighlight style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
          <Text style={styles.bottomText}>don't have an accound? <Text style={styles.bottomLink}>resigter now</Text></Text>
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
  }
})

export default LoginPage
