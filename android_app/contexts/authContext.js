import React, { useContext, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("")
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password)
  }

  const signin = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth().signOut()
  }

  const googleLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn()

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscriber
  }, [])

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    googleLogin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider