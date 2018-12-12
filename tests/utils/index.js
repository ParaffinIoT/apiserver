'use strict'

const utils = {
  deleteAllRequireCache: _ =>
    Object.keys(require.cache).forEach(key => delete require.cache[key]),
  deleteRequireCache: key => delete require.cache[key],
  deleteProcessEnvKeys: (...keys) =>
    keys.forEach(key => delete process.env[key]),
  copyEnvs: _ => Object.assign({}, process.env)

}

module.exports = utils
