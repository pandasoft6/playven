import React from 'react'
import { Link } from 'react-router'
import Text from 'containers/Text'

import helsinkiImage from './images/find-button1.jpg'
import newyorkImage from './images/find-button2.jpg'
import amsterdamImage from './images/find-button3.jpg'

const FindBest = () =>
  <div className="home-section find-best limit-width">
    <h2 className="title-section"><span><Text text="pages.home.find_best_title" /></span></h2>
    <div className="flex-row flex-vc flex-col-tablet flex-col-mobile">
      <div className="city-button-wrapper">
        <Link to="/">
          <span
            className="city-button-background"
            style={{
              backgroundImage: `url(${helsinkiImage})`
            }} />
          <span>Helsinki</span>
        </Link>
      </div>
      <div className="city-button-wrapper">
        <Link to="/">
          <span
            className="city-button-background"
            style={{
              backgroundImage: `url(${newyorkImage})`
            }} />
          <span>New york</span>
        </Link>
      </div>
      <div className="city-button-wrapper">
        <Link to="/">
          <span
            className="city-button-background"
            style={{
              backgroundImage: `url(${amsterdamImage})`
            }} />
          <span>Amsterdam</span>
        </Link>
      </div>
    </div>
  </div>


export default FindBest
