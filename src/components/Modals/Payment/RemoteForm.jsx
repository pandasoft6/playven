import React, { PropTypes } from 'react'

const RemoteForm = ({ children, actionUrl, className, onSubmit }) =>
  <form
    action={actionUrl}
    className={className}
    onSubmit={onSubmit}>
    {children}
  </form>

RemoteForm.propTypes = {
  children: PropTypes.element,
  actionUrl: PropTypes.string,
  className: PropTypes.string,
  onSubmit: PropTypes.func
}

export default RemoteForm
