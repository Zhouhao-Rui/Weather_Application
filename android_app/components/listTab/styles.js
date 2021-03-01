import {
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  tabContainer: {
    height: 35,
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    height: 35,
    paddingLeft: 30,
    paddingRight: 30,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  tabItemCurrent: {
    borderBottomColor: "#23b8ff"
  },
  tabItemText: {
    fontSize: 20,
    color: '#333'
  },
  tabItemTextCurrent: {
    color: "#23b8ff"
  }
})

export default styles