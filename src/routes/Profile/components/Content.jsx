import React, { Component, PropTypes } from 'react'
import Fa from 'react-fontawesome'
import _ from 'lodash'

import utils from '../../../utils'
import Text from '../../../containers/Text'
import DayCard from './DayCard'
import InvoiceCard from '../components/InvoiceCard'
import GamePassCard from '../components/GamePasses/GamePassCard'
import InvoicePayment from './InvoicePayment'
import Pagination from '../containers/Pagination'
import EditInformation from '../containers/EditInformationContainer'

class Content extends Component {
  componentDidMount() {
    this.props.getReservations([])
    this.props.getInvoices([])
    this.props.getGamePasses([], this.props.userId)
  }

  renderElements = () => {
    const {
      pageNumber,
      perPage,
      isFetching,
      reservationsFiltered,
      invoices,
      gamePasses,
      active,
      downloadInvoice,
      openModal,
      payInvoice
    } = this.props

    if (isFetching) {
      return (
        <Fa className="loading color-primary-brand mtl"
          name="refresh"
          spin={true}
          stack="2x" />)
    }

    let data = []
    let card

    switch (active) {
      case 'reservations':
        data = reservationsFiltered
        card = (value, i) => <DayCard
          day={value}
          key={i} />
        break
      case 'invoices':
        data = invoices
        card = (value, i) => <InvoiceCard
          downloadInvoice={downloadInvoice}
          invoice={value}
          key={i}
          openModal={openModal}
          payInvoice={payInvoice} />
        break
      case 'game_passes':
        data = gamePasses
        card = (value, i) => <GamePassCard
          gamePass={value}
          key={i} />
        break
      default:
        break
    }

    const chunkifiedCards = utils.chunkify(data, perPage)
    const currentPage = chunkifiedCards[pageNumber]
    const maxPage = chunkifiedCards.length - 1

    if (_.flatten(chunkifiedCards).length === 0) {
      return <h3><Text text="pages.profile.no_results" /></h3>
    }

    return (
      <div className={active}>
        {currentPage.map(card)}
        {chunkifiedCards.length > 1 && <Pagination
          maxPage={maxPage}
          pageNumber={pageNumber}
          perPage={perPage}
          totalItems={data.length} />}
      </div>)
  }


  render() {
    const {
      active,
      update,
      userId
    } = this.props

    switch (active) {
      case 'edit':
        return (
          <EditInformation onSubmit={credentials => {
            update(credentials, userId)
          }} />)
      default:
        return (
          <div className="max-width" style={{ minHeight: 400 }}>
            {this.renderElements()}
            <InvoicePayment />
          </div>)
    }
  }
}

Content.propTypes = {
  getReservations: PropTypes.func.isRequired,
  getInvoices: PropTypes.func.isRequired,
  getGamePasses: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,

  downloadInvoice: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  payInvoice: PropTypes.func.isRequired,

  active: PropTypes.string.isRequired,
  filter: PropTypes.object.isRequired,
  reservationsFiltered: PropTypes.array.isRequired,
  invoices: PropTypes.array.isRequired,
  gamePasses: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default Content
