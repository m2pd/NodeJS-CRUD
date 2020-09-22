const express = require('express')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')

const SortMiddleware = require('./app/middlewares/sortMiddleware')

const app = express()
const port = 5000

const route = require('./routes')
const db = require('./config/db')

db.connect()

app.use(express.static(path.join(__dirname, 'public'))) 

app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())
app.use(methodOverride('_method'))

//Custom middlewares
app.use(SortMiddleware)

//HTTP
// app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars(
  { extname: '.hbs' ,
    helpers: require('./helpers/handlebars')
}
  
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'))

route(app)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})