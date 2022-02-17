const webpack = require('webpack')
const env = require('dotenv').config({ path: `.env.${process.env.ENV}` }).parsed

module.exports = function override(config, env) {
  config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.environment': JSON.stringify(process.env.REACT_APP_ENV),
    }),
  ])
  return config
}
