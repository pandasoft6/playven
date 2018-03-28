import { connect } from 'react-redux'
import _Text from '../../components/Text'

const mapStateToProps = state => ({
  locale: state.i18n.locale
})

const Text = connect(
  mapStateToProps
)(_Text)

export default Text
