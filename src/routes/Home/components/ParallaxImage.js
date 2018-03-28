import React, { PropTypes, Component } from 'react'

import { TrackDocument, Track } from 'react-track'
import { tween } from 'react-imation'
import { translate3d } from 'react-imation/tween-value-factories'
import {
  topTop,
  topBottom,
  centerCenter,
  topCenter,
  bottomBottom,
  bottomTop,
  getDocumentRect,
  getDocumentElement,
  calculateScrollY
} from 'react-track/tracking-formulas'

export default class ParallaxImage extends Component {
  static propTypes = {
    children: PropTypes.node,
    src: PropTypes.string,
    className: PropTypes.string
  }

  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    return (
      <TrackDocument formulas={[getDocumentElement, getDocumentRect, calculateScrollY,
        topTop, topBottom, topCenter, centerCenter, bottomBottom,
        bottomTop]}>
        {/*eslint-disable */
          (documentElement, documentRect, scrollY, topTop,
          topBottom, topCenter, centerCenter, bottomBottom, bottomTop) =>
            <Track component="div" formulas={[topBottom, bottomTop]}>
              {(Div, posTopBottom, posBottomTop) =>
                <Div
                  className={`parallax-item ${this.props.className}`}
                  style={tween(scrollY, [
                    [posTopBottom, { transform: translate3d(0, -40, 0) }],
                    [posBottomTop, { transform: translate3d(0, 350, 0) }]
                  ])}>
                  <img alt="Parallax" src={this.props.src} />
                </Div>
            }</Track>
        }
      </TrackDocument>
    )
  }
}
