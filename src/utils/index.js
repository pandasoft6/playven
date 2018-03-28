import timeUtils from './timeUtils'

export default {
  chunkify: (array, chunkSize) => {
    const chunkifiedArray = []
    const length = array.length

    if (length <= chunkSize) {
      // we need to return an array with one chunk
      // so if input is [1,2,3], output should be [[1,2,3]]
      return [array]
    }

    for (let i = 0; i < length; i = i + chunkSize) {
      chunkifiedArray.push(array.slice(i, i + chunkSize))
    }
    return chunkifiedArray
  },
  time: timeUtils
}
