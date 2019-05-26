const request = require('request')

const forecast = (latitude,longitude,callback) => {
  const url = `https://api.darksky.net/forecast/35a1c0af2e09a85177d88c0f41ad238b/${latitude},${longitude}`
  request({url,json:true},(err, {body}) => {
    if(err){
      callback('You Are Not Connected To Internet!',undefined)
    } else if(body.error) {
      callback('Unable To Find! Try Another Location!',undefined)
    } else {
      callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
    }
  })
}
module.exports = forecast
