export default () => ({
  path: 'privacypolicy',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const ResetPassword = require('./components/PrivacyPolicy').default

      cb(null, ResetPassword)
    }, 'privacypolicy')
  }
})
