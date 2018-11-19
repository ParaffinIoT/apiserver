'use strict'

const { expect } = require('chai')

describe('Testing  Envs', () => {
  const componentpath = './testing'

  before(() => {
    process.env = {
      CLOUD_CODE_MAIN: '/cloud/main.js',
      APP_ID: 'sdfsdfsdfsdfsd33',
      JAVASCRIPT_KEY: 'sdfsdfsdfdsf',
      MASTER_KEY: 'master_key',
      COLLECTION_PREFIX: 'api',
      CLIENT_KEY: 'CLIENT_KEY',
      REST_API_KEY: 'REST_API_KEY',
      DOTNET_KEY: 'DOTNET_KEY',
      FILE_KEY: 'FILE_KEY',
      APP_NAME: 'APP_NAME',
      PUBLIC_SERVER_URL: 'http://localhost.com',
      API_SERVER_URL: 'http://localhost.com',
      PARSE_MOUNT: 'PARSE_MOUNT',
      ALLOW_INSECURE_HTTP: true,
      DASHBOARD_USER: 'admin ',
      DASHOBOARD_PASS: 'admin',
      DB_URL: 'mongodb://localhost:3307/paraffin',
      PORT: '5000',
      BROKER_IP: '::ffff:127.0.0.1'

    }
  })

  it('should return all envs needed for testing', () => {
    expect(require(componentpath)).to.have.all.keys([
      'CLOUD_CODE_MAIN',
      'APP_ID',
      'JAVASCRIPT_KEY',
      'MASTER_KEY',
      'COLLECTION_PREFIX',
      'CLIENT_KEY',
      'REST_API_KEY',
      'DOTNET_KEY',
      'FILE_KEY',
      'APP_NAME',
      'PUBLIC_SERVER_URL',
      'API_SERVER_URL',
      'PARSE_MOUNT', // eslint disable
      'ALLOW_INSECURE_HTTP',
      'DASHBOARD_USER',
      'DASHOBOARD_PASS',
      'DB_URL',
      'BROKER_IP',
      'PORT',
      'LOG_LEVEL'
    ])
  })
})
