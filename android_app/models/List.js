import {API} from '../utils/config'
import Http from '../utils/http'

export default class ListModel extends Http {
  getCourseFields() {
    return new Promise((resolve, reject) => {
      this.fetchGet({
        url: API.getCourseFields,
        success(data) {
          resolve(data)
        },
        error(error) {
          reject(error)
        } 
      })
    })
  }
  getCourses(field) {
    return new Promise((resolve, reject) => {
      this.fetchGet({
        url: API.getCourses + field,
        success(data) {
          resolve(data)
        },
        error(error) {
          reject(error)
        }
      })
    })
  }
}