import React, { PropTypes } from 'react'
import { I18n } from 'react-redux-i18n'
import racketImage from './images/racket.png'


const AskQuestions = ({ scrollToHeader }) =>
  <div className="content-section ask-questions">
    <div className="ask-questions__image">
      <img alt="Racket" src={racketImage} />
    </div>
    <div className="ask-questions__text">
      <h2>
        {I18n.t('pages.sales.ask_questions_title_1')}
        <br />
        {I18n.t('pages.sales.ask_questions_title_2')}
      </h2>
      <p>{I18n.t('pages.sales.ask_questions_description')}</p>
      <button className="bd-btn-primary" onClick={scrollToHeader}>
        {I18n.t('pages.sales.become_a_partner')}
      </button>
    </div>
  </div>

AskQuestions.propTypes = {
  scrollToHeader: PropTypes.func.isRequired
}

export default AskQuestions
