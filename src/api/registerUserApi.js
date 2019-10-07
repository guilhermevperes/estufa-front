import tccFetch from './tccFetch'

export function registerUserApi (name, password) {
  const urlRegister = '/users'
  const objectReturn = {}
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name,
      password
    })
  }

  return tccFetch(urlRegister, options, true)
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
    }).catch(error => {
      objectReturn.status = 'error catch'
      objectReturn.error = error
      return objectReturn
    })
}
