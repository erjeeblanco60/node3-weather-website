const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { send } = require('process')



const app = express()

//define paths for express config
const pubdir = path.join(__dirname, '../public')         //create variable and reference it. this function redict us to public html content
const viewspath = path.join(__dirname, '../templates/views')          //Views
const partialpart = path.join(__dirname, '../templates/header') //Header partial

// Set up handle bards and view locations
app.set('view engine','hbs')                       //iniciate handle bards app.set(name,value )
app.set('views', viewspath)
hbs.registerPartials(partialpart)


//Set up directory
app.use(express.static(pubdir))                        //app. is const above .use is method to path module. app.use is for redirect the index
   
//npm i hbs //handlebards is for dynamics links/values instead of using static html


//render handle bars template.                      
app.get('', (req, res) => {                                        
    res.render('index',{
        title: 'Weather Page',
        name: 'Erjee B. Conchas'

    })               
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Erjee B. Conchas'
    })

})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        name:  'Erjee B. Conchas'
    })

})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })  
    } 
        geocode(req.query.address, (error, {lat, long, name} = {} ) => {
        if(error) {
            return res.send({error})
        }

        forecast(lat , long, (error, forecastdata) => {
            if (error) {
          return  res.send(error)              
            }

            res.send({
                
                name,
                lat,
                long,
                address: req.query.address,
                forecast: forecastdata

            })
        })

    })

// res.send({
//     forecase: 'Rainy',
//     location: 'philippines',
//     address: req.query.address

// })

})

app.get('/products', (req,res)=> {
    if(!req.query.search) {
      return  res.send({
            error: 'You must provide a address'

        })

    }
    console.log(req.query.search)
    res.send(search)

res.send({
    products: []
})

})


//404 has 2 method for /help* and * in 1 handle bar file 404.hbs

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Erjee B. Conchas',
        errormessage: 'Article page not found'

    })
    })

app.get('*', (req, res)=> {
        res.render('404', {
            title: '404',
            name: 'Erjee B. Conchas',
            errormessage: '404 Page Not found'

        })

})
app.listen(3000, () => {
    console.log('Server is up on port 3000')



})           //listen method








// app.get('',(req, res) => {                             //method

// res.send('<h1> Weather </h1> ')                               //handler 
        
// })

// app.get('/help', (req, res ) => {
// res.send({
//     name: 'erjee',
//     age: 22
// })
// })

// app.get('/about', (req,res ) => {
//         res.send('<h1>about page</h1>')
// })