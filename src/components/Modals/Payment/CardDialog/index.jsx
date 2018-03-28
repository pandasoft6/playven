import React, { Component, PropTypes } from 'react'
import Text from 'containers/Text'

import SelectPlayven from '../SelectPlayven'
import CardDialogOption from './CardDialogOption'
import CardDialogHeader from './CardDialogHeader'
import CardDialogFooter from './CardDialogFooter'

import { PUBLISHABLE_KEY as stripePk } from '../../../../env'

export default class CardDialog extends Component {
  static propTypes = {
    getCards: PropTypes.func,
    user: PropTypes.object,
    addCard: PropTypes.func,
    loaded: PropTypes.bool,
    selectCard: PropTypes.func,
    selectedCard: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      last4: PropTypes.string,
      brand: PropTypes.string,
      exp_month: PropTypes.number.isRequired, // eslint-disable-line camelcase
      exp_year: PropTypes.number.isRequired // eslint-disable-line camelcase
    }))
  }

  constructor(props) {
    super(props)

    this.onOpenStripe = this.onOpenStripe.bind(this)
  }

  componentDidMount() {
    this.initStripe()
    this.props.getCards()
  }

  initStripe() {
    const { user, addCard } = this.props

    this.stripe = StripeCheckout.configure({  // eslint-disable-line no-undef
      key: stripePk,
      locale: localStorage.locale,
      name: 'Playven',
      token: addCard,
      panelLabel: Text.t('modals.payment.add_card'),
      email: user.email,
      allowRememberMe: false,
      description: Text.t('modals.payment.add_new_card')
    })
  }

  onOpenStripe(e) {
    e.preventDefault()
    this.stripe.open()
  }

  renderSelect() {
    const { loaded, selectCard, selectedCard, cards } = this.props
    const end = Text.t('general.ending')
    const expYear = card => card.exp_year.toString().slice(2)
    const options = cards.map(card => ({
      value: card.id,
      last4: card.last4,
      brand: card.brand,
      expMonth: card.exp_month,
      expYear: card.exp_year,
      label: `${card.brand} ${card.last4} ${end} ${card.exp_month}/${expYear(card)}`
    }))

    return (
      <SelectPlayven
        autofocus={true}
        clearable={false}
        disabled={loaded}
        footerMenuComponent={CardDialogFooter}
        footerProps={{ addCard: this.onOpenStripe }}
        headerMenuComponent={Boolean(cards.length) && CardDialogHeader}
        noResultsText={Text.t('modals.payment.no_card')}
        onChange={e => selectCard(e.value)}
        optionComponent={CardDialogOption}
        options={options}
        placeholder={`${Text.t('modals.payment.select_card')}...`}
        searchable={false}
        value={selectedCard} />
    )
  }

  renderAddCardPlaceholder() {
    return (
      <div className="addCardPlaceholder">
        <div className="addCardPlaceholder__text t5 color-grey-600">
          <Text text="modals.payment.no_card_short" />
        </div>
        <button
          className="add-card color-bg-azure color-white text-uc t6"
          onClick={this.onOpenStripe}>
          + <Text text="modals.payment.add_card" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="flex">
        {!this.props.loaded &&
        <div className="cardDialog flex-row flex-col-mobile mbm">
          <div className="flex">
            {this.props.cards.length ? this.renderSelect() : this.renderAddCardPlaceholder()}
          </div>
        </div>
        }
      </div>
    )
  }
}
