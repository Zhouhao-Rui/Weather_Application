import PushNotification from 'react-native-push-notification'

const pushNotificationByWeatherCondition = (current_weather) => {
  // console.log(current_weather)
  // if (current_weather.condition.text.includes("rain") || 
  //     current_weather.condition.text.includes("rainy") || 
  //     current_weather.condition.text.includes("Rain") || 
  //     current_weather.condition.text.includes("Rainy")) {
  //   PushNotification.localNotification({
  //     channelId: "com.pushnotification",
  //     autoCancel: true,
  //     bigText:
  //       'Rain Warning',
  //     subText: 'From Weather Application',
  //     title: 'Raining today',
  //     message: 'Today is raining, do not forget to bring an umbrella',
  //     vibrate: true,
  //     vibration: 300,
  //     playSound: true,
  //     soundName: 'default',
  //   })
  // } else if (current_weather.condition.text.includes("mist") || current_weather.condition.text.includes("Mist")) {
  //   PushNotification.localNotification({
  //     channelId: "com.pushnotification",
  //     autoCancel: true,
  //     bigText:
  //       'Mist Warning',
  //     subText: 'From Weather Application',
  //     title: 'Misty today',
  //     message: 'Today visualization level is low, try not to drive when going out',
  //     vibrate: true,
  //     vibration: 300,
  //     playSound: true,
  //     soundName: 'default',
  //   })
  // } else if (current_weather.temp_c >= 30) {
  //   PushNotification.localNotification({
  //     channelId: "com.pushnotification",
  //     autoCancel: true,
  //     bigText:
  //       'High Temperature Warning',
  //     subText: 'From Weather Application',
  //     title: 'High Temperature today',
  //     message: 'Today temperature is high, do not forget to bring some cooling device',
  //     vibrate: true,
  //     vibration: 300,
  //     playSound: true,
  //     soundName: 'default',
  //   })
  // } else if (current_weather.temp_c < 0) {
  //   PushNotification.localNotification({
  //     channelId: "com.pushnotification",
  //     autoCancel: true,
  //     bigText:
  //       'Low Temperature Warning',
  //     subText: 'From Weather Application',
  //     title: 'Low Temperature today',
  //     message: 'Today temperature is low, do not forget to wear more clothes',
  //     vibrate: true,
  //     vibration: 300,
  //     playSound: true,
  //     soundName: 'default',
  //   })
  // } else if (current_weather.vis_km <= 0.3) {
  //   PushNotification.localNotification({
  //     channelId: "com.pushnotification",
  //     autoCancel: true,
  //     bigText:
  //       'Mist Warning',
  //     subText: 'From Weather Application',
  //     title: 'Misty today',
  //     message: 'Today visualization level is low, try not to drive when going out',
  //     vibrate: true,
  //     vibration: 300,
  //     playSound: true,
  //     soundName: 'default',
  //   })
  // } else if (current_weather.wind_mph >= 15) {
  //   PushNotification.localNotification({
  //     channelId: "com.pushnotification",
  //     autoCancel: true,
  //     bigText:
  //       'Windy Warning',
  //     subText: 'From Weather Application',
  //     title: 'Windy today',
  //     message: 'Today wind level is high, try not to drive out and wear a jacket',
  //     vibrate: true,
  //     vibration: 300,
  //     playSound: true,
  //     soundName: 'default',
  //   })
  // }
  PushNotification.localNotification({
    channelId: "com.pushnotification",
    autoCancel: true,
    bigText:
      'Current Weather',
    subText: 'From My Weather Application',
    title: current_weather.condition.text,
    message: `The temparture now is ${current_weather.temp_c}, and the wind speed is ${current_weather.wind_mph} / mph`,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
  })
}

export default pushNotificationByWeatherCondition