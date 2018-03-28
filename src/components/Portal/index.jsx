import React from 'react'
import ReactDOM from 'react-dom'

class Portal extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.element
  }

  componentDidMount() {
    let p = this.props.id && document.getElementById(this.props.id)

    if (!p) {
      p = document.createElement('div')
      p.id = this.props.id
      document.body.appendChild(p)
    }
    this.portalElement = p
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    ReactDOM.render(
      <div className={this.props.className}>{this.props.children}</div>, this.portalElement
    )
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalElement)
  }

  portalElement = null;

  render() {
    return null
  }
}

export default Portal
