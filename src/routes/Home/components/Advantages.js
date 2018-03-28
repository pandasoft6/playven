import React from 'react'
import Text from 'containers/Text'
import imageNotebook from './images/notebook.png'

const Advantages = () =>
  <div className="home-section advantages">
    <div className="limit-width">
      <div className="text-center">
        <h2><Text text="pages.home.book_fast_title" /></h2>
        <p className="subtitle-block">
          <Text text="pages.home.book_fast_sub_title" />
        </p>
      </div>
    </div>
    <div className="advantages-image-notebook">
      <img alt="Notebook" src={imageNotebook} />
    </div>
    <div className="limit-width">
      <div className="advantage-list-wrapper flex-row flex-hb">
        <div className="advantage-item-wrapper">
          <div className="advantage-item">
            <h3>
              <span><Text text="pages.home.advantages.search" /></span>
              <i className="icon-medium-arrow-right t5 mls color-turquoise" />
            </h3>
            <p><Text text="pages.home.advantages.search_text" /></p>
          </div>
        </div>
        <div className="advantage-item-wrapper">
          <div className="advantage-item">
            <h3>
              <span><Text text="pages.home.advantages.book" /></span>
              <i className="icon-medium-arrow-right t5 mls color-turquoise" />
            </h3>
            <p><Text text="pages.home.advantages.book_text" /></p>
          </div>
        </div>
        <div className="advantage-item-wrapper">
          <div className="advantage-item">
            <h3>
              <span><Text text="pages.home.advantages.pay" /></span>
              <i className="icon-medium-arrow-right t5 mls color-turquoise" />
            </h3>
            <p><Text text="pages.home.advantages.pay_text" /></p>
          </div>
        </div>
        <div className="advantage-item-wrapper">
          <div className="advantage-item">
            <h3>
              <span><Text text="pages.home.advantages.play" /></span>
              <i className="icon-man-playing-tennis t1 mls color-turquoise" />
            </h3>
            <p><Text text="pages.home.advantages.play_text" /></p>
          </div>
        </div>
      </div>
    </div>
  </div>


export default Advantages
