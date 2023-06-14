const request = require('request')

const forecast = (latitide, longitude, callback)=>{

    const forecastURL = 'http://api.weatherstack.com/current?access_key=9301b99f30dbe50c9b0a3ad68fac7891&query='+ latitide +','+ longitude +'&units=f'

    request({url: forecastURL, json: true}, (error, { body }) => {
        //const data = JSON.parse(response.body)
        if(error)
        {
            callback('Network Error is comming!', undefined)
        }
        else if(body.error)
        {
            callback('unable to find location!', undefined)
        }
        else{
           callback(undefined , body.current.temperature + '. It feels like '+ body.current.feelslike  +' degress out .  There is chance of ' + body.current.precip + '% chance of rain') 
        }
        //console.log('It is currently ' + response.body.current.temperature + '. It feels like '+ response.body.current.feelslike  +' degress out .  There is chance of ' + response.body.current.precip + '% chance of rain')
    })
    
}

module.exports = forecast