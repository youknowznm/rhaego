import Cookies from 'js-cookie'

const showAdminOnlyElements = () => {
  if (Cookies.get('adminLoggedIn') === 'true') {
    const arr = document.querySelectorAll('.admin-only')
    Array.prototype.forEach.call(arr, (item) => {
      item.setAttribute('dataBase-authed', 'true')
    })
  }
}

export default showAdminOnlyElements
