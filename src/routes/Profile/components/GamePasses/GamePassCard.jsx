import React  from 'react'
import { Link } from 'react-router'
import backgroundImage from './gamePassBg.png'
import { I18n } from 'react-redux-i18n'

const GamePassCard = ({ gamePass }) =>
  <div className="game-pass-card">
    <div className="game-pass-card__holder">
      <div className="game-pass-card__head" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="flex-row flex-hb flex-vc mbm">
          <div className="game-pass-card__venue-link">
            <Link to={`/venues/${gamePass.venue_id}`}>
              {gamePass.venue_name}
            </Link>
          </div>
          <div className="game-pass-card__price">
            <sup className="currency">{gamePass.currency_unit}</sup>
            {gamePass.price}
          </div>
        </div>
        <div className="game-pass-card__title">{gamePass.name}</div>
        <div className="game-pass-card__description">
          {I18n.t(
          'pages.profile.game_pass.left_charges', {
            remainingCharges: gamePass.remaining_charges,
            totalCharges: gamePass.total_charges
          })}
        </div>
      </div>
      <div className="game-pass-card__list">
        <div className="game-pass-card__item">
          <div className="game-pass-card__item-title">
            {I18n.t('pages.profile.game_pass.date_range')}
          </div>
          <div className="game-pass-card__item-value">{gamePass.dates_limit}</div>
        </div>
        <div className="game-pass-card__item">
          <div className="game-pass-card__item-title">
            {I18n.t('pages.profile.game_pass.time_and_days')}
          </div>
          <div className="game-pass-card__item-value">{gamePass.time_limitations}</div>
        </div>
        <div className="game-pass-card__item">
          <div className="game-pass-card__item-title">
            {I18n.t('pages.profile.game_pass.court_type')}
          </div>
          <div className="game-pass-card__item-value">{gamePass.court_type}</div>
        </div>
        <div className="game-pass-card__item">
          <div className="game-pass-card__item-title">
            {I18n.t('pages.profile.game_pass.sports')}
          </div>
          <div className="game-pass-card__item-value">{gamePass.court_sports}</div>
        </div>
      </div>
    </div>
  </div>

export default GamePassCard
