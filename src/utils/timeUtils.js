import moment from 'moment'

  // Start time 06:00, 12:00, 14:00, 21:30...
  // amount in minutes, 5, 30, 60, 180

export const addToTime = (startTime: String, amount: Number) => {
  let [hours, minutes] = startTime.split(':').map(Number)
  const isNextDay = hour => hour % 24 >= 0

  hours = hours + Math.floor((amount + minutes) / 60)
  minutes = (amount + minutes) % 60

  if (isNextDay(hours)) {
    hours = hours % 24
  }

  return `${hours}:${minutes === 0 ? `0${minutes}` : minutes}`
}

  // numberify -> string -> int
  // @time1: [start, end]
  //    @start: HH:MM
  //    @end:   HH:MM
export const numberify = time => Number(time.replace(':', ''))

// isInside -> Array -> String -> boolean
export const isInside = (timeFrame: Array, time: String) => {
  const startTime = numberify(timeFrame[0])
  const endTime = numberify(timeFrame[1])
  const timeAsNumber = numberify(time)

  return startTime < timeAsNumber && endTime > timeAsNumber
}

  // isBetween -> String -> String -> boolean
  // @time1: [start, end]
  //    @start: HH:MM
  //    @end:   HH:MM
  // @time2: [start, end]
  //    @start: HH:MM
  //    @end:   HH:MM
export const collapses = (time1: Array, time2: Array) =>
  // Verify following cases:
    /*
      Cases:
        time1           time2
        12:00 - 14:00 | 12:00 - 14:00 : equal time

        12:00 - 14:00 | 13:00 - 15:00 : start time is inside
        12:00 - 14:00 | 11:00 - 13:00 : end time is inside

      Notes:
        Minutes need to be handled also.
        12:30 - 14:00 | 11:00 - 12:00 : is not between even if start/end hours equal
    */

  // Equal                  Start time inside            End time inside
  time1 === time2 || isInside(time1, time2[0]) || isInside(time1, time2[1])

export const sortByTimeAsc = (lhs, rhs) => {
  const time1 = moment(lhs, 'HH:mm')
  const time2 = moment(rhs, 'HH:mm')

  if (time1 > time2) {
    return 1
  }
  if (time1 < time2) {
    return -1
  }
  return 0
}

export default {
  addToTime,
  numberify,
  collapses,
  isInside,
  sortByTimeAsc
}
