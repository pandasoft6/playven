import React, { PropTypes } from 'react'

import Navigation from 'containers/Navigation'
import Text from 'containers/Text'

import ParallaxImage from './ParallaxImage'

import VenueCarousel from '../containers/VenueCarouselContainer'
import Header from './Header'
import Advantages from './Advantages'
import ContentBlock from './ContentBlock'
import Payment from '../../../containers/Modals/Payment'

import infoImg1 from './images/info-img.jpg'
import infoImg2 from './images/info2-img.jpg'
import circle1 from './images/circle_1.svg'
import playerImage from './images/player.png'

const HomeView = ({ auth }) =>
  <div id="home-view">
    <header className="home-header-wrapper">
      <Navigation theme="navigation-transparent" />
      <Header />
    </header>
    <main className="landing-page-content">
      <div className="pos-relative">
        <ParallaxImage className="content-block-player-image" src={playerImage} />
        <ContentBlock
          auth={auth}
          className="content-block-with-player"
          title={Text.t('pages.home.content_title_1')}>
          <p><Text text="pages.home.content_text_1" /></p>
          <p><Text text="pages.home.content_text_2" /></p>
        </ContentBlock>
      </div>

      <VenueCarousel />
      <Payment />
      <Advantages />

      <ContentBlock
        auth={auth}
        image={infoImg1}
        title={Text.t('pages.home.content_title_2')}>
        <p><Text text="pages.home.content_text_3" /></p>
        <p><Text text="pages.home.content_text_4" /></p>
        <ParallaxImage className="content-block-circle-over-right" src={circle1} />
      </ContentBlock>

      <ContentBlock
        auth={auth}
        contentRight={true}
        image={infoImg2}
        title={Text.t('pages.home.content_title_3')}>
        <p>
          <Text text="pages.home.content_text_5" />{' '}
          <Text text="pages.home.content_text_6" />
        </p>
        <ParallaxImage className="content-block-circle-under-left-bottom small" src={circle1} />
      </ContentBlock>
    </main>
  </div>

HomeView.propTypes = {
  auth: PropTypes.bool.isRequired
}

export default HomeView

