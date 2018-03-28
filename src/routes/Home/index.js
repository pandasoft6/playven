import HomeView from './containers/HomeViewContainer'
export default () => ({
  getComponent(nextState, cb) {
    cb(null, HomeView)
  }
})
