import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import Text from '../../../../containers/Text'
import Fa from 'react-fontawesome'
import RemoteForm from '../../../../components/Modals/Payment/RemoteForm'
import CardDialog from '../../../../components/Modals/Payment/CardDialog'
import ScrollArea from 'react-scrollbar'
import { InvoiceComponent,
         CustomInvoiceComponent,
         GamepassInvoiceComponent } from './InvoiceComponent'

const getComponents = array =>
  array.map(item =>
    <InvoiceComponent
      date={item.start_time_iso8601}
      endTime={item.end_time}
      key={item.id}
      price={item.price}
      startTime={item.start_time} />)

const getCustomComponents = array =>
  array.map(item =>
    <CustomInvoiceComponent
      key={item.id}
      name={item.name}
      price={item.price} />)

const getGamepassComponents = array =>
  array.map(item =>
    <GamepassInvoiceComponent
      key={item.id}
      price={item.price} />)

const MainContent = ({
  cardsLoaded,
  cards,
  selectedCard,
  invoice,
  getCards,
  selectCard,
  addCard,
  user,
  payInvoice,
  handleHide
}) =>
  <Modal.Body>
    <div className="payment-modal__modal-block color-bg-white flex-col">
      <div
        className="modal-block__main-container flex-col" >
        <h2 className="flex-row flex-hs color-dark-grey text-uc em-high mbt">
          <Text text="modals.payment.title" />
        </h2>
        <div className="t5 text-uc color-light-grey">
          <Text text="modals.invoicePayment.prompt" />
        </div>
      </div>
      <ScrollArea
        className="summary-items-wrapper"
        contentClassName="content"
        horizontal={false}
        speed={0.8} >
        {getComponents(invoice.components)}
        {getCustomComponents(invoice.customComponents)}
        {getGamepassComponents(invoice.gamepassComponents)}
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
        className="modal-block__bottom-container">
        <div className="flex-row flex-hb mbm" style={{ marginBottom: '1rem' }}>
          <h2 className="totalPriceTitle color-dark-grey">
            <Text text="modals.payment.total_price" />
          </h2>
          <h2 className="totalPrice color-turquoise">
            <span className="inline-span">
              {invoice.total}
            </span>
          </h2>
        </div>
        <RemoteForm action="" type="post">
          <div className="flex-row flex-col-mobile">
            <CardDialog
              addCard={addCard}
              cards={cards}
              getCards={getCards}
              loaded={cardsLoaded}
              selectCard={selectCard}
              selectedCard={selectedCard}
              user={user} />
            {!cardsLoaded &&
              <div className="flex-col flex-vc">
                <button className="pay-button pl-btn-primary"
                  disabled={cardsLoaded || !cards.length}
                  onClick={e => {
                    e.preventDefault()
                    payInvoice({
                      invoice,
                      onSuccess: () => handleHide()
                    })
                  }}>
                  <Text text="modals.payment.pay_button" />
                </button>
              </div>
            }
          </div>
        </RemoteForm>
      </div>
    </div>
  </Modal.Body>

MainContent.propTypes = {
  cardsLoaded: PropTypes.bool.isRequired,
  invoice: PropTypes.object.isRequired,
  selectedCard: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCards: PropTypes.func.isRequired,
  selectCard: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleHide: PropTypes.func.isRequired,
  payInvoice: PropTypes.func.isRequired
}

export default MainContent

