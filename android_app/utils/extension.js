// 封装跳转页面
function directToPage (navigation, pageName, params) {
  return function() {
    navigation.navigate(pageName, params)
  }
}

export {
  directToPage
}