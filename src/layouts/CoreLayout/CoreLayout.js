import React from 'react'
import Footer from '../../components/Footer'
import '../../styles/core.scss'
import { connect } from 'react-redux'

// Wrap default layout into a special component which gets re-rendered every time
// when locale change. This will re-fire requests, hence backend requests will fetch
// new locale and the whole app will be localised into a new language.
class LanguageAware extends React.Component {
  render() {
    return (
      <div key={this.props.locale}>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.i18n.locale
})
const LanguageAwareContainer = connect(mapStateToProps, null)(LanguageAware)


export const CoreLayout = ({ children }) =>
  <div className="flex-col flex">
    <div className="flex-col flex">
      <LanguageAwareContainer>
        {children}
      </LanguageAwareContainer>
    </div>
    <Footer />
  </div>

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

LanguageAware.propTypes = {
  locale: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired
}


export default CoreLayout
