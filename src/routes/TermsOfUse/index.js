export default () => ({
  path: 'termsofuse',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const ResetPassword = require('./components/TermsOfUse').default

      cb(null, ResetPassword)
    }, 'termsofuse')
  }
})
