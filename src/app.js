const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Define path for express config 
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsView = path.join(__dirname,'../templates/partials')

// Setup handlers engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsView)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Shilpesh'
    })
})

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'About me',
    name: 'Deepansh'
  })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Welcome to help page',
        name: 'Help Deepansh'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address)
    {
         return res.send({
            error: 'You must provide the address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) =>{
        if(error)
        {
            return res.send({
                error: error
            })
        }

        forecast(latitude,longitude, (error, forecastData) =>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // console.log(req.query.address)
    // res.send({
    //     forecast: 50,
    //     location: 'Philadelphia',
    //     address: req.query.address
    //  })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
      return res.send({
        error: 'You must provide search term'
       })
    }
    console.log(req.query.search)
   res.send({
       products: []
   })
})

app.get('/help/*',(req, res) => {
  res.render('404', {
    title: '404 Not Found',
    name : 'Deepansh',
    errorMessage: 'Help Article not found'
  })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 page found',
        name: 'Deepansh',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000 !')
})