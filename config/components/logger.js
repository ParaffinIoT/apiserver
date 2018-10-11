'use strict'

const joi = require('joi')

const envVarsSchema = joi
  .object({
    LOG_LEVEL: joi
      .string()
      .valid(['error', 'warn', 'info', 'verbose', 'debug'])
      .default('info'),
  })
  .unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  LOG_LEVEL: envVars.LOG_LEVEL,
}

module.exports = config
