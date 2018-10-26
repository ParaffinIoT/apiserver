const config = require('../config')
const brokerIP = config('BROKER_IP')
//var brokerIP = process.env.BROKER_IP || '::ffff:127.0.0.1'

Parse.Cloud.define("hello", async request => {
  try {
    return ('Hello world, Peace be upon Jesus who will return with Mahdi')
  } catch (error) {
    throw error.message;
  }
});



Parse.Cloud.define('auth', async request => {
  // the params passed through the start request
  const params = request.params
  // Headers from the request that triggered the job
  const headers = request.headers
  // get the parse-server logger
  const log = request.log
  const isMaster = request.master // if the function is run with masterKey
  //console.log("Request:");
  //console.log(request);
  //console.log("headers:");
  //console.log(JSON.stringify(headers));
  //console.log("params:");
  //console.log(JSON.stringify(params));
  console.log("logs:");
  console.log(JSON.stringify(log));

  if (!isMaster) {
    var e = {
      error: 'Masterkey is not valid',
      code: '503'
    }
    return e
  }

  if (request.ip != brokerIP) {
    var e = {
      error: 'IP isnot valid',
      code: '503'
    }
    return e
  }

  const Thing = Parse.Object.extend('Thing')
  const query = new Parse.Query(Thing)
  query.equalTo('clientId', params.id)
  const results = await query.find()
  console.log('@@@@#$%%')
  console.log(results[0].get('name'))
  if (results.length != 1) {
    var e = {
      error: 'ClientId lookup failed',
      code: '403'
    }
    console.log('Error: ' + e)
    return e
  }

  if (results[0].get('name') == params.name) {
    var password = params.token
    var secrets = results[0].get('secret')
    var r

    if ('type' in secrets) {
      if (secrets.type == 'openid') {
        secrets.password = password
      } else if (secrets.type == 'hashedpassword') {
        secrets.password = password //temporary
      }

      if (password == secrets.password) {
        r = {
          authorized: true,
          profile: {
            topics: results[0].get('topics'),
          }
        }
        return r
      }

      var e = {
        error: 'Authentication failed',
        code: '203'
      }
      console.log('Error: ' + e)
      return e
    }
  }

  var e = {
    error: 'Unmatched information',
    code: '303'
  }
  console.log('Error: ' + e)
  return e
})