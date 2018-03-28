import React, { PropTypes } from 'react'
import Text from '../../../containers/Text'

const ProfileNavigationOrder = ({ filter, onChangeFilter, options }) =>
  <div className="profile-navigation-secondary">
    {options.map((link, i) =>
      <div
        className={`profile-navigation_link ${filter.order === options[i].value ?
          'active' :
          ''}`
        }
        key={i}
        onClick={() => {
          onChangeFilter({ name: 'order', value: options[i].value})
        }}
        role="button">
        <Text text={options[i].translation} />
      </div>
    )}
  </div>

ProfileNavigationOrder.propTypes = {
  filter: PropTypes.object.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default ProfileNavigationOrder
