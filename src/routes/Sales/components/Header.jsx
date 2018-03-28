import React, { Component, PropTypes } from 'react'
import { I18n } from 'react-redux-i18n'
import headerImg from './images/computer.png'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }

    this.onPartnerClick = this.onPartnerClick.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.onPartnerClick()
    }
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  onPartnerClick() {
    this.props.saveEmail({
      email: this.state.email,
      onSuccess: () => this.setState({ email: '' })
    })
  }

  focus() {
    setTimeout(() => {
      this.textInput.focus()
      this.props.onFocus()
    }, 2000)
  }

  render() {
    return (
      <div className="sales-page__header">
        <div className="sales-page__header-wrapper">
          <div className="sales-page__header-content">
            <div className="sales-page__header-content-text">
              <h1>{I18n.t('pages.sales.main_title')}</h1>
              <div className="sales-page__lead">
                {I18n.t('pages.sales.main_subtitle')}
              </div>
              <div className="sales-page__email-form">
                <div className="sales-page__input">
                  <label>{I18n.t('pages.sales.enter_your_email')}</label>
                  <input
                    onChange={this.onEmailChange}
                    ref={input => {
                      this.textInput = input
                    }}
                    type="email"
                    value={this.state.email} />
                </div>
                <button className="bd-btn-primary" onClick={this.onPartnerClick}>
                  {I18n.t('pages.sales.become_a_partner')}
                </button>
              </div>
            </div>
            <div className="sales-page__header-image">
              <img alt="Venue layout" src={headerImg} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
}

export default Header
