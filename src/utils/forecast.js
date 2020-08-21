const request = require('request') // npm i request

//define the call back function
const forecast = (latitude, longitude , callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=b279d2b52d4054d1bfc507d24c71b66d&query=' + latitude + ',' + longitude + '&units=m' 
        
    request(
        {
             url,            // url: url, 
            json: true
        },
             
    (error, {body}) => {                                 //destructure method (error,response) => {
            if (error) {
                callback('Unable to connect', undefined) 
            } else if (body.error) { 
                callback('Unable to locate', undefined)
         } else { 
          callback (undefined, 'Weather Description: '+ body.current.weather_descriptions[0] +' throughout the day.  ' + 'It is current: ' + body.current.temperature + ' degress. ' + 'It Feels like: ' + body.current.feelslike + ' degress ' )
             
        //   callback( undefined,{
                  
        //          temperature: body.current.temperature,
        //          itfeelslike: response.body.current.feelslike,
        //          description: response.body.current.weather_descriptions[0]
        //      })


            }
        })    
    
    }
    
    
    module.exports = forecast
    