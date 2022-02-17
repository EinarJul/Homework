const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: `.env.${process.env.ENV}` }).parsed

const AuthenticationMiddleware = require('./Api/Middleware/AuthenticationMiddleware')
const CorsMiddleware = require('./Api/Middleware/CorsMiddleware')
const ErrorHandler = require('./Api/Middleware/ErrorHandler')
const TestRoute = require('./Api/Routes/Test')
const Auth = require('./Api/Routes/Auth')
const Categories = require('./Api/Routes/Categories')
const Posts = require('./Api/Routes/Posts')
const Profile = require('./Api/Routes/Profile')
const Grow = require('./Api/Routes/Grow')
const ModeratorPanelCategories = require('./Api/Routes/ModeratorPanel/Categories')
const ModeratorPanelSellerRequest = require('./Api/Routes/ModeratorPanel/SellerRequests')

const port = 3001

// Whitelist cors origins
const corsSettings = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
}

const app = express()
app.use(helmet())
app.use(cors(corsSettings))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

if (process.env.MORGAN_LOGS) {
  app.use(morgan('dev'))
}

const connectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`
mongoose.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (!err) {
      console.log('::MONGODB -> CONNECTED TO DB')
    } else {
      console.log('::MONGODB -> CONNECTION FAILED: ', err)
    }
  }
)

// Middleware
app.use((req, res, next) => CorsMiddleware(req, res, next))
app.use((error, req, res, next) => ErrorHandler(error, req, res, next))

// Routing
app.use('/auth', Auth)
app.use('/categories', Categories)
app.use('/posts', Posts)
app.use('/grow', [AuthenticationMiddleware], Grow)
app.use('/test', [AuthenticationMiddleware], TestRoute)
app.use('/user/profile', [AuthenticationMiddleware], Profile)

app.use('/panel', [AuthenticationMiddleware], ModeratorPanelCategories)
app.use('/panel', [AuthenticationMiddleware], ModeratorPanelSellerRequest)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
