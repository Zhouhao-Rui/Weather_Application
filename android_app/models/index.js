import { API } from '../utils/config'

import Http from '../utils/http'

export default class IndexModel extends Http {
  getCourseData() {
    return new Promise((resolve, reject) => {
      this.fetchGet({
        url: API.getCourseDatas,
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