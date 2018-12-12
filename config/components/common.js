'use strict'
const joi = require('joi')

const envVarsSchema = joi
  .object({
    CLOUD_CODE_MAIN: joi.string().required(),
    APP_ID: joi.string().required(),
    JAVASCRIPT_KEY: joi.string().required(),
    MASTER_KEY: joi.string().required(),
    COLLECTION_PREFIX: joi.string().required(),
    CLIENT_KEY: joi.string().required(),
    REST_API_KEY: joi.string().required(),
    DOTNET_KEY: joi.string().required(),
    FILE_KEY: joi.string().required(),
    APP_NAME: joi.string().required(),
    PUBLIC_SERVER_URL: joi.string().uri().required(),
    API_SERVER_URL: joi.string().required(),
    PARSE_MOUNT: joi.string().required(), // eslint disable
    ALLOW_INSECURE_HTTP: joi.boolean().default(true),
    DASHBOARD_USER: joi.string().required(),
    DASHOBOARD_PASS: joi.string().required()
  })
  .unknown()

const { error, value: env } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  CLOUD_CODE_MAIN: env.CLOUD_CODE_MAIN,
  APP_ID: env.APP_ID,
  JAVASCRIPT_KEY: env.JAVASCRIPT_KEY,
  MASTER_KEY: env.MASTER_KEY,
  COLLECTION_PREFIX: env.COLLECTION_PREFIX,
  CLIENT_KEY: env.CLIENT_KEY,
  REST_API_KEY: env.REST_API_KEY,
  DOTNET_KEY: env.DOTNET_KEY,
  FILE_KEY: env.FILE_KEY,
  APP_NAME: env.APP_NAME,
  PUBLIC_SERVER_URL: env.PUBLIC_SERVER_URL,
  API_SERVER_URL: env.API_SERVER_URL,
  PARSE_MOUNT: env.PARSE_MOUNT,
  ALLOW_INSECURE_HTTP: env.ALLOW_INSECURE_HTTP,
  DASHBOARD_USER: env.DASHBOARD_USER,
  DASHOBOARD_PASS: env.DASHOBOARD_PASS
}
