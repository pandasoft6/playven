import React, { Component } from 'react'
import Navigation from '../../../containers/Navigation'
import Header from './Header'
import OurPlans from './OurPlans'
import WhatElseTable from './WhatElseTable'
import HowDoWeHelp from './HowDoWeHelp'
import AskQuestions from './AskQuestions'
import ManageYourBooking from './ManageYourBooking'
import BookingImprovement from './BookingImprovement'
import { addEmailToList } from '../../../api/mailchimp-api'
import scrollTo from 'scroll-to'

class Sales extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldTriggerFocus: false
    }

    this.scrollToHeader = this.scrollToHeader.bind(this)
  }

  scrollToHeader() {
    scrollTo(0, 0, { duration: 1500 })
    this.setState({ shouldTriggerFocus: true })
  }

  render() {
    const { shouldTriggerFocus } = this.state

    return (
      <div className="flex color-bg-white">
        <header>
          <Navigation theme={'light'} />
        </header>

        <Header
          onFocus={() => this.setState({ shouldTriggerFocus: false })}
          saveEmail={addEmailToList}
          shouldTriggerFocus={shouldTriggerFocus} />
        <BookingImprovement />
        <HowDoWeHelp />
        <WhatElseTable />
        <ManageYourBooking />
        <OurPlans />
        <AskQuestions scrollToHeader={this.scrollToHeader} />
      </div>
    )
  }
}

export default Sales
