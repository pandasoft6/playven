export default () => ({
  path: 'sales',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const Sales = require('./components/Sales').default

      cb(null, Sales)
    }, 'sales')
  }
})
