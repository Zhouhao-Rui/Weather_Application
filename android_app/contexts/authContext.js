import React, { useContext, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
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
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider