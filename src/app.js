const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
//Heroku will give it's own port
//if run locally
//the 3000 will be asigned
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Meshoo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Meshoo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help message.',
        title: 'Help',
        name: 'Meshoo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
        
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, {temperature, description, temp_min, temp_max} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                temperature,
                description,
                temp_min,
                temp_max,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found',
        title: 'Error',
        name: 'Meshoo'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Error 404. Page not found',
        title: 'Error',
        name: 'Meshoo'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})