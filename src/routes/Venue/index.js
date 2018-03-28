import { injectReducer } from '../../store/reducers'
export default store => ({
  path: 'venues/:id',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const VenueView = require('./containers/VenueViewContainer').default
      const reducer = require('./modules/venue').default

      injectReducer(store, {
        key: 'venue',
        reducer
      })
      cb(null, VenueView)
    }, 'venue')
  }
})
