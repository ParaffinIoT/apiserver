'use strict'


const logger = require('bunyan')
const config = require('../config')




const log = logger.createLogger({
    name: "Paraffin Server",
    level: config('LOG_LEVEL')
})



module.exports = {
    log
}