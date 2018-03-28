import axios from 'axios'

export const setLocaleHeader = locale => {
  axios.defaults.headers.common.locale = locale
}
