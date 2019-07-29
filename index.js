
'use strict'

const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')
const path = require('path')
const morgan = require('morgan')
const config = require('./config')
const { log } = require('./lib/utils')

const allowInsecureHTTP = config('ALLOW_INSECURE_HTTP')


const parseSetting = {
  databaseURI: config('DB_URL'),
  cloud: path.join(__dirname, config('CLOUD_CODE_MAIN')),
  appId: config('APP_ID'),
  javascriptKey: config('JAVASCRIPT_KEY'),
  masterKey: config('MASTER_KEY'),
  collectionPrefix: config('COLLECTION_PREFIX'),
  clientKey: config('CLIENT_KEY'),
  restAPIKey: config('REST_API_KEY'),
  dotNetKey: config('DOTNET_KEY'),
  fileKey: config('FILE_KEY'),
  appName: config('APP_NAME'),
  publicServerURL: config('PUBLIC_SERVER_URL'),
  logLevel: config('LOG_LEVEL'),
  serverURL: config('API_SERVER_URL'),
  liveQuery: {
    classNames: ['Device', 'IFTTT'] 
  }
}

const api = new ParseServer(parseSetting)

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: parseSetting.serverURL,
        appId: parseSetting.appId,
        masterKey: parseSetting.masterKey,
        appName: 'Paraffin Dashboard'
      }
    ],
    users: [
      {
        user: config('DASHBOARD_USER'),
        pass: config('DASHOBOARD_PASS')
      }
    ]
  },
  { allowInsecureHTTP }
)

const app = express()

app.use('/public', express.static(path.join(__dirname, '/public')))

const mountPath = config('PARSE_MOUNT')
app.use(mountPath, api)

app.use('/dashboard', dashboard)

app.get('/', function (req, res) {
  res.status(200).send('I dream of being an IoT website.')
})

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'))
})

app.use('/api', api)
  .use(morgan('combined'))

const port = config('PORT')
const httpServer = require('http').createServer(app)
httpServer.listen(port, function () {
  log.info('Paraffin API Server is running on port ' + port + '.')
})

ParseServer.createLiveQueryServer(httpServer)
