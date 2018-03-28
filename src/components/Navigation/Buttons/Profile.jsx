import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import iconUser from 'assets/icons/icon-user.svg'

const Profile = ({ firstName, id }) =>
  <div className="navigation-link">
    <Link to={'/profile'}>
      <img alt="user" src={iconUser} />
      <span>{ firstName }</span>
    </Link>
  </div>

const mapStateToProps = state => ({
  firstName: state.auth.user.first_name,
  id: state.auth.user.id
})

export default connect(mapStateToProps)(Profile)
