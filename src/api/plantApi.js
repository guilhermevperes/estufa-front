import tccFetch from './tccFetch'

export function registerPlantApi (plantName, controlType, temperature, moisture, timeLightStart, timeLightEnd) {
  const url = '/plants'
  const objectReturn = {}
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name: plantName,
      controlType,
      temperature,
      moisture,
      timeLightStart,
      timeLightEnd
    })
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

export function getPlantApi () {
  const url = '/plants'
  const objectReturn = {}
  const options = {
    method: 'GET'
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
