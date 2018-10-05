// Example express application adding the parse-server module to expose Parse
// compatible API routes.
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');

var allowInsecureHTTP = process.env.ALLOW_INSECURE_HTTP || true;
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to mongodb://localhost:27017/paraffin.');
}

/*
var api = new ParseServer({
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

var parseSetting = {
  databaseURI: databaseUri || 'mongodb://localhost:27017/paraffin',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'APP_ID',
  javascriptKey: process.env.JAVASCRIPT_KEY || 'JAVASCRIPT_KEY',
  masterKey: process.env.MASTER_KEY || 'MASTER_KEY', //Add your master key here. Keep it secret!
  //readOnlyMasterKey: process.env.READONLY_MASTER_KEY || 'READONLY_MASTER_KEY',
  collectionPrefix: process.env.COLLECTION_PREFIX,
  clientKey: process.env.CLIENT_KEY || 'CLIENT_KEY',
  restAPIKey: process.env.REST_API_KEY || 'REST_KEY',
  javascriptKey: process.env.JAVASCRIPT_KEY || 'JAVASCRIPT_KEY',
  dotNetKey: process.env.DOTNET_KEY,
  fileKey: process.env.FILE_KEY,
  appName: process.env.APP_NAME || 'Paraffin IoT Platform',
  publicServerURL: process.env.PUBLIC_SERVER_URL,
  logLevel: process.env.LOG_LEVEL || 'info',
  serverURL: process.env.API_SERVER_URL || 'http://localhost:1337/api', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Device", "IFTTT"] // List of classes to support for query subscriptions
  }
}

var api = new ParseServer(parseSetting);
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey


var dashboard = new ParseDashboard({
  "apps": [{
    "serverURL": parseSetting.serverURL,
    "appId": parseSetting.appId,
    "masterKey": parseSetting.masterKey,
    "appName": "Paraffin Dashboard"
  }],
  "users": [{
    "user": process.env.dashboardUser || "admin",
    "pass": process.env.dashboardPass || "admin"
  }]
}, allowInsecureHTTP);



var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/api';
app.use(mountPath, api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being an IoT website.');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.API_SERVER_PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('Paraffin API Server is running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);