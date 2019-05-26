const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
  res.render('index',{
    title: 'Weather app',
    name: 'AT Programmer'
  })
})

app.get('/about',(req,res) => {
  res.render('about',{
    title: 'About Me',
    name: 'AT Programmer'
  })
})

app.get('/help',(req,res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'AT Programmer',
    helpText: 'This is some helpful text---'
  })
})


app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must Provide an address!'
    })

  }
    geocode(req.query.address, (error,{latitude , longitude , location} = {}) => {
        if(error) {
          return res.send({error})
        }
        forecast(latitude , longitude , (error, forecastData) => {
          if(error) {
            return res.send({error})
          }

          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
        })
    })
  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'Shergarhi',
  //   address: req.query.address
  // })
})


app.get('/products',(req,res) => {

  if (!req.query.search) {
    return res.send({
      error: 'You Must Provide a search term'
    })

  }
  console.log(req.query.search)
  res.send({
    product: []
  })

})

app.get('/help/*',function(req,res) {
  res.render('404',{
      title: '404',
      name: 'AT Programmer',
      errorMessage: 'help article not found'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title: '404',
    name: 'AT Programmer',
    errorMessage: 'page not found'
  })
})


app.listen(3000,() => {
  console.log('Server is listening at port No.3000')
})
