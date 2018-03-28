import axios from 'axios'
import md5 from 'md5'

// each request is signed via MD5(request.body + salt)
// this makes harder for other people to use our API when we don't want to
const serializeObject = object => {
  let params = ''
  // JSON.stringify will be called by axios later on the same object,
  // which theoretically guarantees same key order

  if (object && typeof object === 'object') {
    params = JSON.stringify(object) || ''
  }

  // eslint-disable-next-line
  return md5(params + __SIGNATURE_SECRET__)
}

export default function () {
  axios.interceptors.request.use(config => {
    config.headers.signature = serializeObject(config.data)
    return config
  })

  // to stay "secure" we don't include token we encrypt with (obviously)
  // we include an app name, and backend will fetch a secret token
  // eslint-disable-next-line
  axios.defaults.headers.common['app-name'] = __APP_NAME__
}
