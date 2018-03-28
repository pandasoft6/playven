import React from 'react'

const links = [
  {
    name: 'facebook',
    url: 'https://www.facebook.com/ampersports/'
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/ampersports'
  }
]

const SocialLinks = () =>
  <div className="social-links flex-row flex-hc mvs">
    {links.map((link, index) =>
      <a className="t3 mls" href={link.url} key={index}>
        <i className={`icon-${link.name}`} />
      </a>
    )}
  </div>

export default SocialLinks
