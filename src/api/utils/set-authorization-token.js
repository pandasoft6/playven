import axios from 'axios'

export default function setAuthorizationToken(token) {
  if (token) {
    localStorage.setItem('authToken', token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    localStorage.removeItem('authToken')
    delete axios.defaults.headers.common.Authorization
  }
}
