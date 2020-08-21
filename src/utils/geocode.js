const request = require('request') // npm i request


const geocode = (address, callback) => {                //constant = function 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiZXJqZWVibGFuY282MCIsImEiOiJja2R5MmQwNzYyN296MnpueXR4bDdmb2pwIn0.yYYwfr4XwJgNbaYItJHpaA&limit=1'

    request(                                             //array object
        {
            url, //url: url //shorthand syntax
            json: true 
        }, 

        (error, {body}) => {               //destructure method (error,response) => {
        if (error) {
            callback('unable to connect', undefined )
        } else if (body.features.length === 0) {
                callback('Unable to find location', undefined )

        }else  { 
            callback(undefined, {
         name: body.features[0].place_name,          // name: response.body.features[0].place_name,
         lat: body.features[0].center[1],
         long: body.features[0].center[0]

            })

        }

    })
    
}

    module.exports =
        geocode
    