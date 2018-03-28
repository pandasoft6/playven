import React from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import Text from 'containers/Text'
import SearchGrid from 'containers/Searchgrid'

const SearchFilter = ({ showModal, hideModal, show, handleHide }) =>
  <Modal
    dialogClassName="search-filter-modal"
    show={show}
    onHide={handleHide}
    backdrop={true}>
    <i className="icon-cross2 modal-close" onClick={handleHide} />
    <Modal.Body>
      <h4 className="text-uc mlm mbm color-dark-grey">
        <Text text="modals.filters.title" />
      </h4>
      <SearchGrid onClickSubmit={handleHide} />
    </Modal.Body>
  </Modal>


export default connectModal({
  name: 'searchFilter'
})(SearchFilter)
