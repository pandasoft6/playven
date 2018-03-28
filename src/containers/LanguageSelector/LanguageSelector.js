import { connect } from 'react-redux'
import { changeLocale } from '../../api/profile-api'

import LanguageSelector from '../../components/LanguageSelector'
import { toggleMenu } from '../../actions/language-selection-actions'

const mapStateToProps = state => ({
  displayMenu: state.languageSelection.showing,
  locale: state.i18n.locale
})

const mapDispatchToProps = {
  changeLocale,
  toggleMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector)
