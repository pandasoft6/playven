import React from 'react'
import Text from '../../containers/Text'

const links = [
  {
    name: 'footer.help',
    url: 'https://playven.zendesk.com/hc/fi'
  },
  {
    name: 'footer.terms',
    url: '/termsofuse'
  },
  {
    name: 'footer.privacy',
    url: '/privacypolicy'
  }
]

const FooterLinks = () =>
  <div className="footer-links flex-row flex-col-mobile flex-hc text-center mvs-desktop">
    {links.map((link, index) =>
      <div key={index}>
        <a className="mhs t5" href={link.url}>
          <Text text={link.name} />
        </a>
      </div>
    )}
  </div>

export default FooterLinks
