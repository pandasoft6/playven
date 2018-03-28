import { connect } from 'react-redux'
import { moveToPage } from '../../modules/search'
import Pagination from '../../../../components/Pagination'

const mapDispatchToProps = dispatch => ({
  onClick: pageNumber => dispatch(moveToPage(pageNumber))
})

export default connect(
  null,
  mapDispatchToProps
)(Pagination)
