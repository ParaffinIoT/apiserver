'use strict'
/* global Parse */

const config = require('../config')
const brokerIP = config('BROKER_IP')

Parse.Cloud.define('hello', async (request) => {
// some hell cloud function goes here
})

Parse.Cloud.define('auth', async request => {
  const params = request.params
  const log = request.log
  const isMaster = request.master
  if (!isMaster) {
    let es = {
      error: 'Masterkey is not valid',
      code: '503'
    }
    return es
  }

  if (request.ip !== brokerIP) {
    let e = {
      error: 'IP isnot valid',
      code: '503'
    }
    return e
  }

  const Thing = Parse.Object.extend('Thing')
  const query = new Parse.Query(Thing)
  query.equalTo('clientId', params.id)
  const results = await query.find()
  if (results.length !== 1) {
    let e2 = {
      error: 'ClientId lookup failed',
      code: '403'
    }
    return e2
  }

  if (results[0].get('name') === params.name) {
    let password = params.token
    let secrets = results[0].get('secret')
    let r

    if ('type' in secrets) {
      if (secrets.type === 'openid') {
        secrets.password = password
      } else if (secrets.type === 'hashedpassword') {
        secrets.password = password // temporary
      }

      if (password === secrets.password) {
        r = {
          authorized: true,
          profile: {
            topics: results[0].get('topics')
          }
        }
        return r
      }

      var e = {
        error: 'Authentication failed',
        code: '203'
      }
      return e
    }
  }

  let e3 = {
    error: 'Unmatched information',
    code: '303'
  }
  return e3
})
