const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=e2b412a32b1c5381d831c83590632711&units=metric'
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                temp_min: body.main.temp_min,
                temp_max: body.main.temp_max
            })
        }
    })
}



module.exports = forecast