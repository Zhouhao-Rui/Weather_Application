import axios from 'axios'
import {API_KEY, API_URL, NEWS_API_KEY, NEWS_API_URL} from '@env'

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

export function requestNewsByPage(config) {
    const instance = axios.create({
        baseURL: "https://newsapi.org/v2/everything",
        timeout: 5000,
        params: {
            apiKey: NEWS_API_KEY
        }
    })

    instance.interceptors.request.use(res => {
        console.log(res)
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