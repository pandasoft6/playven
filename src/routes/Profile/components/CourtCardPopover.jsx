import React from 'react'
import Popover from 'antd/lib/popover'
import CourtCard from './CourtCard'
import CourtCardPopoverContent from '../containers/CourtCardPopoverContentContainer'

const CourtCardPopover = props =>
  <Popover
    content={<CourtCardPopoverContent {...props} />}
    overlayClassName="court-card-popover__wrapper"
    trigger="click">
    <button>
      <CourtCard reservation={props.reservation} />
    </button>
  </Popover>

export default CourtCardPopover
