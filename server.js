const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
//const session = require('express-session')
const app = require('express')()
const nuxt_options = require('./nuxt.config')

const userRoute = require('./api/routes/user')
const authRoute = require('./api/routes/auth')

const cookieParser = require('cookie-parser')

require('dotenv').config()

app.use(cookieParser(process.env.APP_SECRET_KEY))
app.use(bodyParser.json())


/*app.use(session({
  secret: process.env.APP_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))*/



app.use('/users', userRoute)
app.use('/auth', authRoute)

// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt(nuxt_options)
// No build in production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')