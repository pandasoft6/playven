import _ from 'lodash'
export default function errorsToFullMessage(errors) {
  return _.map(errors, (v, k) => `${_.capitalize(k).replace(/_/g, ' ')} ${v.join(', ')}`).join(', ')
}
