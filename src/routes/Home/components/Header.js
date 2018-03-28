import React from 'react'
import Text from 'containers/Text'
import SearchGrid from 'containers/Searchgrid/SearchGrid'

const Header = () =>
  <div className="home-section home-header limit-width color-white text-uc">
    <h1>
      <Text text="pages.home.main_title" />
    </h1>
    <div className="home-header-lead">
      <Text text="pages.home.main_subtitle" />
    </div>
    <SearchGrid />
  </div>


export default Header
