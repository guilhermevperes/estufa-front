import tccFetch from './tccFetch'

export function loginApi (name, password) {
  const urlLogin = '/users/login'
  const objectReturn = {}
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name,
      password
    })
  }

  return tccFetch(urlLogin, options, true)
    .then(({ error, data, response, request }) => {
      if (error || data.erros) {
        objectReturn.status = 'error'
        objectReturn.data = data
        return objectReturn
      } else {
        objectReturn.status = 'success'
        objectReturn.data = data
        return objectReturn
      }
    })
    .catch(error => {
      objectReturn.status = 'error catch'
      objectReturn.error = error
      return objectReturn
    })
}
