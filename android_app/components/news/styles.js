import {
  StyleSheet
} from 'react-native'

import {screenSize} from '../../utils/tools'

const styles = StyleSheet.create({
  newsBoard: {
    width: screenSize.width
  },
  newsItem: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    marginTop: 10
  },
  newsItemFirst: {
    marginTop: 0
  },
  imgView: {
    width: 142,
    height: 100
  },
  infoView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 100,
    width: screenSize.width,
    paddingLeft: 152,
    paddingTop: 10,
    paddingBottom: 10
  },
  newsName: {
    lineHeight: 20,
  },
  author: {
    color: '#000',
    marginTop: 5
  },
  time: {
    color: '#000',
    marginTop: 5
  }
})

export default styles