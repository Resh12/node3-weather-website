const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app= express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Jinu Job'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'Jinu Job',
        img: '/img/18f84a0.jpg'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        helptext: 'This is helptext', 
        name: 'Jinu Job'
    })
})

app.get('/weather', (req,res)=>{

    if (!req.query.address)
    {
        return res.send({
            error: 'Address must be provided'
        })
    }
    
    geocode(req.query.address, (error, {lattitude, longitude, location } = {}) =>{
        if (error)
        {
            return res.send({error})
        }
    
        forecast(lattitude, longitude, (error, forecastdata) => {
            if (error)
            {
                return res.send({error})
            }
    
            res.send({
                forecast:forecastdata,
                location,
                address: req.query.address
            })
          })
          
    })
})


    

app.get('/products', (req,res)=>{
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a searh term'
        })
    }
    console.log(req.query.search)
    res.send({
            products:[]
        }        
    )
})

app.get('/help/*', (req,res)=>{
    res.render('error', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Jinu Job'

    })
    
})

app.get('*', (req,res)=>{
    res.render('error', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Jinu Job'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})