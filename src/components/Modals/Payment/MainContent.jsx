import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import ScrollArea from 'react-scrollbar'
import Fa from 'react-fontawesome'
import RemoteForm from './RemoteForm'
import CardDialog from './CardDialog'
import Text from '../../../containers/Text'

export default class MainContent extends Component {
  state = {
    headerHeight: 70,
    footerHeight: 138
  }

  componentDidMount() {
    this.setContentPaddings()
    window.addEventListener('resize', this.setContentPaddings.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setContentPaddings.bind(this))
  }

  setContentPaddings() {
    if (this.header && this.header.clientHeight) {
      this.setState({
        headerHeight: this.header.clientHeight
      })
    }
    if (this.footer) {
      this.setState({
        footerHeight: this.footer.clientHeight
      })
    }
  }

  render() {
    const { courtCount, sumDuration, cardsLoaded, priceWithDiscount, user, doesCostAnything,
      addCard, cards, getCards, onCardAdd, selectCard, selectedCard, pay, skipButton,
      changePaymentView, venueItems, onSuccess, currency } = this.props

    return (
      <Modal.Body>
        <div
          className="payment-modal__modal-block color-bg-white flex-col"
          style={{
            paddingTop: this.state.headerHeight,
            paddingBottom: this.state.footerHeight
          }}>
          <div
            className="modal-block__main-container flex-col"
            // eslint-disable-next-line
            ref={node => this.header = node}>
            <h2 className="flex-row flex-hs color-dark-grey text-uc em-high mbt">
              <Text text="modals.payment.title" />
            </h2>
            <div className="t5 text-uc color-light-grey">
              <span>{courtCount} </span>
              <span> {sumDuration} </span>
              <Text text="modals.payment.minutes" />
            </div>
          </div>

          <ScrollArea
            className="summary-items-wrapper"
            contentClassName="content"
            horizontal={false}
            speed={0.8}>
            {venueItems}
          </ScrollArea>

          {cardsLoaded &&
          <div className="payment-modal__spinner flex-row flex-vc">
            <Fa className="color-primary-brand"
              name="refresh"
              spin={true}
              stack="2x" />
          </div>
          }

          <div
            className="modal-block__bottom-container"
            // eslint-disable-next-line
            ref={node => this.footer = node}>
            <div className="flex-row flex-hb mbm" style={{ marginBottom: '1rem' }}>
              <h2 className="totalPriceTitle color-dark-grey">
                <Text text="modals.payment.total_price" />
              </h2>
              <h2 className="totalPrice color-turquoise">
                <span className="inline-span">
                  {priceWithDiscount} <span className="currency">{currency}</span>
                </span>
              </h2>
            </div>
            {!user &&
            <div>
              <span className="t5 text-uc color-light-grey mbm">
                <Text text="modals.payment.not_logged" />
              </span>
              <div style={{ marginTop: '1rem' }}>
                <button
                  className="sign-in-button"
                  onClick={() => changePaymentView('signin')}>
                  <Text text="modals.payment.signin" />
                </button>
                <button
                  className="sign-up-button"
                  onClick={() => changePaymentView('signup')}>
                  <Text text="modals.payment.signup" />
                </button>
              </div>
            </div>
            }

            {user && <RemoteForm action="" type="post">
              <div className="flex-row flex-col-mobile">
                { doesCostAnything &&
                <CardDialog
                  addCard={addCard}
                  cards={cards}
                  getCards={getCards}
                  loaded={cardsLoaded}
                  onCardAdd={onCardAdd}
                  selectCard={selectCard}
                  selectedCard={selectedCard}
                  user={user} />
                }
                {!cardsLoaded &&
                <div className="flex-col flex-vc">
                  <button
                    className={
                      `pay-button pl-btn-primary ${doesCostAnything ? '' : 'big-button'}`
                    }
                    disabled={cardsLoaded || !cards.length && doesCostAnything}
                    onClick={e => {
                      e.preventDefault()
                      pay(
                        {
                          doesCostAnything,
                          onSuccess: () => {
                            changePaymentView('success')
                            onSuccess()
                          }
                        }
                      )
                    }}>
                    <Text text={
                      `modals.payment.${doesCostAnything ?
                        'pay_button' :
                        'pay_button_with_game_pass'}`
                    } />
                  </button>
                  {skipButton}
                </div>
                }
              </div>
            </RemoteForm>
            }
          </div>
        </div>
      </Modal.Body>
    )
  }
}

MainContent.propTypes = {
  courtCount: PropTypes.string,
  sumDuration: PropTypes.number,
  cardsLoaded: PropTypes.bool.isRequired,
  priceWithDiscount: PropTypes.number,
  user: PropTypes.object,
  doesCostAnything: PropTypes.bool,
  addCard: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  getCards: PropTypes.func.isRequired,
  onCardAdd: PropTypes.func,
  selectCard: PropTypes.func.isRequired,
  selectedCard: PropTypes.string,
  pay: PropTypes.func.isRequired,
  skipButton: PropTypes.object,
  changePaymentView: PropTypes.func.isRequired,
  venueItems: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  onSuccess: PropTypes.func
}
