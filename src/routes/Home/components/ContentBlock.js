import React, { PropTypes } from 'react'
import Text from 'containers/Text'
import { show } from 'redux-modal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const ContentBlock = ({ className, image, title, contentRight, children, auth }) =>
  <div className={`
    home-section
    home-content-block
    limit-width
    flex-row
    ${contentRight ? 'flex-row-reverse' : ''}
    ${className || ''}
  `}>
    <div className="home-section-content-half">
      <h2>{title}</h2>
      {children}
      <button
        className="bd-btn-primary"
        onClick={() => {
          if (!auth) {
            show('register')
          }
        }}>
        <Text text="pages.home.join_button" />
      </button>
    </div>
    {image && <div className="home-content-block-image flex-row flex-vc">
      <div><img alt="App view" src={image} /></div>
    </div>}
  </div>

ContentBlock.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  contentRight: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  auth: PropTypes.bool
}

export default connect(
  null,
  dispatch => ({
    ...bindActionCreators({
      show
    }, dispatch)
  })
)(ContentBlock)
