const env = process.env.NODE_ENV || 'development'

/* eslint camelcase: ["error", {properties: "never"}] */

const apiEndpoints = {
  development: {
    playven: 'http://localhost:3030/api',
    assets: 'http://localhost:3030',
    social_signin: {
      facebook: 'http://localhost:3030/auth/facebook'
    }
  },
  test: {
    playven: 'http://localhost:3030/api'
  },
  production: {
    playven: 'https://apibeta.playven.com/api',
    assets: 'https://apibeta.playven.com',
    social_signin: {
      facebook: 'https://apibeta.playven.com/auth/facebook'
    }
  }
}

module.exports = apiEndpoints[env]
