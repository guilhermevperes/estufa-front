import tccFetch from './tccFetch'

export function getDataPlant () {
  const url = '/registerPlant'
  const objectReturn = {}
  const options = {
    method: 'GET'
    // body: JSON.stringify({

    // })
  }

  return tccFetch(url, options, true)
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

export function searchPlantApi (plantId) {
  const url = `/registers/${plantId}`
  const objectReturn = {}
  const options = {
    method: 'GET'
    // body: JSON.stringify({

    // })
  }

  return tccFetch(url, options, true)
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
