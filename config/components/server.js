'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  PORT: joi.number().min(1).required()
}).unknown()

const { error, value: env } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  PORT: env.PORT
}
