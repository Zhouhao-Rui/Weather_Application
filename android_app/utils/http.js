export default class Http {
  fetchGet(options) {
    return fetch(options.url)
    .then(res => res.json())
    .then(resBody => {
      options.success(resBody)
    })
    .catch(error => {
      options.error(error)
    })
  }
}

