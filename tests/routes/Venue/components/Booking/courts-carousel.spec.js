import React from 'react'
import CourtsCarousel from 'routes/Venue/components/Booking/CourtsCarousel'

/* global shallow */

describe('CourtsCarousel', () => {
  it('renders children passed', () => {
    const children = [<div key={1}>Hello world!</div>]
    const wrapper = shallow(
      <CourtsCarousel>
        {children}
      </CourtsCarousel>
    )

    expect(wrapper).to.contain(children[0])
  })
})
