
'use strict'

const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')
const path = require('path')
const morgan = require('morgan')
const config = require('./config')
const { log } = require('./lib/utils')

const allowInsecureHTTP = config('ALLOW_INSECURE_HTTP')

/*
const api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  databaseOptions: databaseOptions,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',

  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY, //Add your master key here. Keep it secret!
  serverURL: serverURL,

  collectionPrefix: process.env.COLLECTION_PREFIX,
  clientKey: process.env.CLIENT_KEY,
  restAPIKey: process.env.REST_API_KEY,
  javascriptKey: process.env.JAVASCRIPT_KEY,
  dotNetKey: process.env.DOTNET_KEY,
  fileKey: process.env.FILE_KEY,
  filesAdapter: filesAdapter,

  auth: auth,
  facebookAppIds: facebookAppIds,
  maxUploadSize: process.env.MAX_UPLOAD_SIZE,
  push: pushConfig,
  verifyUserEmails: verifyUserEmails,
  emailAdapter: emailAdapter,
  enableAnonymousUsers: enableAnonymousUsers,
  allowClientClassCreation: allowClientClassCreation,
  //oauth = {},
  appName: process.env.APP_NAME,
  publicServerURL: process.env.PUBLIC_SERVER_URL,
  liveQuery: liveQueryParam,
  logLevel: process.env.LOG_LEVEL || 'info'
  //customPages: process.env.CUSTOM_PAGES || // {
  //invalidLink: undefined,
  //verifyEmailSuccess: undefined,
  //choosePassword: undefined,
  //passwordResetSuccess: undefined
  //}
});
*/

const parseSetting = {
  databaseURI: config('DB_URL'),
  cloud: path.join(__dirname, config('CLOUD_CODE_MAIN')), // path for cloud code main.js
  appId: config('APP_ID'),
  javascriptKey: config('JAVASCRIPT_KEY'),
  masterKey: config('MASTER_KEY'), // Add your master key here. Keep it secret!
  // readOnlyMasterKey: process.env.READONLY_MASTER_KEY || 'READONLY_MASTER_KEY',
  collectionPrefix: config('COLLECTION_PREFIX'),
  clientKey: config('CLIENT_KEY'),
  restAPIKey: config('REST_API_KEY'),
  dotNetKey: config('DOTNET_KEY'),
  fileKey: config('FILE_KEY'),
  appName: config('APP_NAME'),
  publicServerURL: config('PUBLIC_SERVER_URL'),
  logLevel: config('LOG_LEVEL'),
  serverURL: config('API_SERVER_URL'), // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Device', 'IFTTT'] // List of classes to support for query subscriptions
  }
}

const api = new ParseServer(parseSetting)
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

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
  allowInsecureHTTP
)

const app = express()

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')))

// Serve the Parse API on the /parse URL prefix
const mountPath = config('PARSE_MOUNT')
app.use(mountPath, api)

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard)

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being an IoT website.')
})

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'))
})

// Serve the Parse API on the /parse URL prefix
app.use('/api', api)
  .use(morgan('combined'))

const port = config('PORT')
const httpServer = require('http').createServer(app)
httpServer.listen(port, function () {
  log.info('Paraffin API Server is running on port ' + port + '.')
})

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer)
