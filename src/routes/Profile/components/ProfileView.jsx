import React from 'react'
import Navigation from '../../../containers/Navigation'
import ProfileNavigation from '../containers/ProfileNavigationContainer'
import Content from '../containers/ContentContainer'

const ProfileView = () =>
  <div className="flex color-bg-white">
    <Navigation />

    <main className="pal pam-mobile">
      <ProfileNavigation />
      <Content />
    </main>
  </div>


export default ProfileView
