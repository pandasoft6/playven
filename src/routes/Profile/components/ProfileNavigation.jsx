import React, { PropTypes } from 'react'
import Text from '../../../containers/Text'
import SecondaryProfileNavigation from '../containers/SecondaryProfileNavigationContainer'
import { FILTER_ORDER } from '../modules/profile'

const links = [{
  value: 'edit',
  translation: 'pages.profile.navigation.edit_profile'
}, {
  value: 'reservations',
  translation: 'pages.profile.navigation.my_reservations',
  defaultOrder: FILTER_ORDER.FUTURE
}, {
  value: 'game_passes',
  translation: 'pages.profile.navigation.game_passes',
  defaultOrder: FILTER_ORDER.VALID
}, {
  value: 'invoices',
  translation: 'pages.profile.navigation.invoices',
  defaultOrder: FILTER_ORDER.UNPAID
}]

const ProfileNavigation = ({ active, onClick, firstName, lastName }) =>
  <div className="profile-navigation-wrapper">
    <div className="profile-navigation">
      <div className="mtm-mobile text-uc">
        <div className="color-primary-brand t5 em-high full-width-mobile text-center-mobile">
          <Text text="pages.profile.your_profile" />
        </div>
        <div className="color-dark-grey t2 em-high full-width-mobile text-center-mobile">
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
      </div>
      <div className="profile-navigation_row mtt-mobile mvm-gt-mobile">
        { links.map((v, i) =>
          <div
            className={`profile-navigation_link ${active === links[i].value ?
              'active' :
              ''}`
            }
            key={i}
            onClick={() => onClick(links[i].value, links[i].defaultOrder)}>
            <Text text={links[i].translation} />
          </div>)}
      </div>
    </div>
    <SecondaryProfileNavigation />
  </div>

ProfileNavigation.propTypes = {
  active: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default ProfileNavigation
