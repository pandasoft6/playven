import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

export default class SelectPlayven extends Component {
  static propTypes = {
    headerMenuComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    footerMenuComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    headerProps: PropTypes.object,
    footerProps: PropTypes.object,
    className: PropTypes.string,
    openMenuToBottom: PropTypes.bool,
    menuStyle: PropTypes.object,
    menuContainerStyle: PropTypes.object
  }

  componentDidMount() {
    this.select.renderOuter = this.renderOuter
  }

  // we need to override renderOuter to add header and footer
  // `this` is context of react-select
  renderOuter(options, valueArray, focusedOption) {
    const Header = this.props.headerMenuComponent
    const Footer = this.props.footerMenuComponent
    const { headerProps, footerProps } = this.props
    const menu = this.renderMenu(options, valueArray, focusedOption)

    if (!menu) {
      return null
    }

    return (
      <div
        className="Select-menu-outer"
        /*eslint-disable */
        onMouseDown={this.handleMouseDownOnMenu}
        ref={ref => this.menuContainer = ref}
        style={this.props.menuContainerStyle}>
        {Header &&
          <div className="Select-menu-header">
            <Header {...headerProps} />
          </div>
        }
        <div
          className="Select-menu"
          id={`${this._instancePrefix}-list`}
          onScroll={this.handleMenuScroll}
          ref={ref => this.menu = ref}
          /*eslint-enable */
          role="listbox"
          style={this.props.menuStyle}>
          {menu}
        </div>
        {Footer &&
          <div className="Select-menu-footer">
            <Footer {...footerProps} />
          </div>
        }
      </div>
    )
  }

  render() {
    const className = `
      SelectPlayven ${this.props.className || ''} 
      ${this.props.openMenuToBottom ? 'open-menu-to-bottom' : ''}`

    return (
      <Select
        className={className}
        ref={node => this.select = node} // eslint-disable-line no-return-assign
        {...this.props} />
    )
  }
}
