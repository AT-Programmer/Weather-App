 const request = require('request')

const geocode = (address,callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2F1cmF2a21yIiwiYSI6ImNqdnVnaXEycTNnMWo0YnJ0NmdyZXltM3EifQ.VvheRJpYSpWQKZBPKvWUIQ'
  request({url,json:true},(err, {body }) => {
    if(err){
      callback('Unable to coonect to location services',undefined)
    } else if(body.features.length === 0 ){
      callback('Unable to find location ! Try Another Search!')
    } else{
      callback(undefined, {
                  latitude:body.features[0].center[1],
                  longitude:body.features[0].center[0],
                  location: body.features[0].place_name})
                }
          })
  }



module.exports = geocode
