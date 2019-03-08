const request = require('request')

const forecast =(latitude, longitude, callback)=>{
    const url ='https://api.darksky.net/forecast/6f9dcfbcf34f6bfc97f6ce9a6e2eec23/' + latitude + ',' + longitude + '?units=si'

request({url, json:true}, (error, {body}) => {
    if (error)
    {
        callback('Unable to connect to weather service', undefined)
    }
    else if(body.error) {
        callback('Unable to find location', undefined)
    }
    else{
        const temp = body.currently.temperature
        const precipProbability = body.currently.precipProbability
       
        callback(undefined, "summary:" + body.daily.data[0].summary + " It is currently " + temp + ' degrees. There is a ' + precipProbability + ' chance of rain.')
    }
})
}

module.exports = forecast
