import Fingerprint2 from 'fingerprintjs2'
import Cookies from 'js-cookie'

// 获取浏览器指纹，传入回调
const getFingerprint = (cb) => {
  let fingerprint = Cookies.get('fingerprint')
  if (fingerprint !== undefined) {
    cb(fingerprint)
  } else {
    new Fingerprint2().get((fingerprint) => {
      Cookies.set('fingerprint', fingerprint)
      cb(fingerprint)
    })
  }
}

export default getFingerprint
