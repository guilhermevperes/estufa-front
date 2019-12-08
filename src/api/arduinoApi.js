import tccFetch from './tccFetch'

export function startComunicationApi (plantData) {
  const url = '/arduino'
  const objectReturn = {}
  const options = {
    method: 'POST',
    body: JSON.stringify({
      controlType: plantData.controlType,
      plantId: plantData._id,
      temperature: plantData.temperature,
      moisture: plantData.moisture,
      timeLightEnd: plantData.timeLightEnd,
      timeLightStart: plantData.timeLightStart
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
