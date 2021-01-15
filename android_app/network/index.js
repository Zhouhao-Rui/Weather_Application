  
import axios from 'axios'

export function requestDayWeather(config) {
    const instance = axios.create({
        baseURL: 'http://120.26.161.157:9001/api/dayweather/',
        timeout: 5000
    })

    instance.interceptors.request.use(res => {
        // console.log(res)
        return res
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        // console.log(res.data)
        return res.data
    }, err => {
        console.log(err)
    })


    // instance本身是一个Promise对象，直接return出去可以调用then和catch
    return instance(config)
}

export function requestHourWeather(config) {
  const instance = axios.create({
      baseURL: 'http://120.26.161.157:9001/api/hourweather/',
      timeout: 5000
  })

  instance.interceptors.request.use(res => {
      // console.log(res)
      return res
  }, err => {
      console.log(err)
  })

  instance.interceptors.response.use(res => {
      // console.log(res.data)
      return res.data
  }, err => {
      console.log(err)
  })


  // instance本身是一个Promise对象，直接return出去可以调用then和catch
  return instance(config)
}
