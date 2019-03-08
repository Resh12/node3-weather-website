const request = require('request')

const geocode =(address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmVzaDEyMyIsImEiOiJjanN3aWp0cngwYm1nM3pteGEzZjg5M2xuIn0.8BAQIkbK-VUlxcy-PVEU9w&limit=1'
    request({url, json:true}, (error, {body}) => {
     if (error)
    {
        callback('Unable to connect to location service', undefined)
    }
    else if(body.features.length === 0) {
        callback('Unable to find location', undefined)
    }
    else{
        const lattitude = body.features[0].center[0]
        const longitude = body.features[0].center[1]
        const location = body.features[0].place_name       
     
    callback(undefined, {lattitude,longitude,location})
    }
})

    
}
module.exports = geocode