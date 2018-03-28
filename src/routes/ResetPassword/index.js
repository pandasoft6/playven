export default () => ({
  path: 'password/edit',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const ResetPassword = require('./components/ResetPasswordView').default

      cb(null, ResetPassword)
    }, 'password/edit')
  }
})
