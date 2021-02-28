import axios from 'axios'
import {API_KEY, API_URL} from '@env'

export function requestWeather(config) {
    const instance = axios.create({
        baseURL: API_URL,
        timeout: 5000,
        params: {
            key: API_KEY
        }
    })

    instance.interceptors.request.use(res => {
        return res
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    return instance(config)
}