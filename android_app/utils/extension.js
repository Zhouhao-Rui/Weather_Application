// 封装跳转页面
function directToPage(navigation, pageName, params) {
  return function () {
    navigation.navigate(pageName, params)
  }
}

const getNearest = (array, obj) => {
  // first sort the arr
  let arr = array.concat([]);
  arr.push(obj);
  arr.sort((a, b) => {
    return b.latitude - a.latitude
  })
  let index = arr.indexOf(obj)
  if (index === 0) {
    return arr[index + 1].name
  } else if (index === arr.length - 1) {
    return arr[index - 1].name
  }
  let resultIndex =
    arr[index].latitude - arr[index - 1].latitude  > arr[index + 1].latitude  - arr[index].latitude 
      ? index + 1
      : index - 1;
  return arr[resultIndex].name;
}

export {
  directToPage,
  getNearest
}