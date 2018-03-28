import React, { Component, PropTypes } from 'react'
import './field-renderer.scss'

class FieldRenderer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLabel: false
    }

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { input } = this.props

    if (!input.value && nextProps.input.value) {
      this.onFocus()
    }
  }

  onFocus(reduxFormFocus) {
    this.setState({ showLabel: true })
    if (reduxFormFocus) {
      reduxFormFocus()
    }
  }

  onBlur(reduxFormBlur) {
    this.setState({ showLabel: false })
    if (reduxFormBlur) {
      reduxFormBlur()
    }
  }

  render() {
    const { showLabel } = this.state

    const {
      className,
      placeholder,
      input,
      type,
      meta: { touched, error }
    } = this.props

    // eslint-disable-next-line
    const onBlurFn = !input.value ? () => this.onBlur(input.onBlur) : input.onBlur
    const onFocusFn = () => this.onFocus(input.onBlur)
    const inputProps = { ...input, onBlur: onBlurFn, onFocus: onFocusFn }

    return (
      <div className="field-renderer-container flex">
        <input
          className={className}
          {...inputProps}
          placeholder={placeholder}
          style={{ borderColor: `${error && touched ? 'red' : '#0e7dff'}`, width: '100%' }}
          type={type} />
        <label
          className="input-upper-label"
          style={{ display: `${showLabel ? 'block' : 'none'}` }}>
          {placeholder}
        </label>
        {touched && error &&
          <span
            className="input-upper-label"
            style={{ bottom: '-1.5rem' }}>
            {error}
          </span>
        }
      </div>
    )
  }
}

FieldRenderer.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object,
  type: PropTypes.string,
  meta: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  showLabel: PropTypes.bool
}

export default FieldRenderer
