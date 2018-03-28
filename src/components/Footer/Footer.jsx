import React from 'react'

import FooterLinks from './FooterLinks'
import SocialLinks from './SocialLinks'
import LanguageSelector from '../../containers/LanguageSelector'
import logo from '../../assets/images/TIA_SaaS-partner-logo.png'

const Footer = () =>
  <footer
    className="footer color-bg-turquoise color-white flex-row flex-vc phm">
    <div className="flex flex-row flex-hb flex-ha-lt-desktop flex-vc limit-width">
      <a className="logo mls-lt-desktop mts-lt-desktop" href="/">
        <i className="icon-logo-playven t2" />
      </a>

      <img alt="Partner" className="logo-partner" src={logo} />

      <div className="links flex-row flex-col-lt-desktop mtl-lt-desktop flex-hb-desktop">
        <FooterLinks />
        <SocialLinks />
      </div>

      <div className="language mrs-lt-desktop mts-lt-desktop text-right">
        <LanguageSelector />
      </div>
    </div>
  </footer>

export default Footer

