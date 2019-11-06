import React, { useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import Main from '../../components/main/Main'
import Text from '../../components/text/Text'
import Graphic from '../../components/graphic/Graphic'
import socketio from 'socket.io-client'
import DataView from '../../components/data-view/DataView'
import { getPlantApi } from '../../api/plantApi'
import { startComunicationApi } from '../../api/arduinoApi'

export default function Dashboard ({ history, location }) {
  const [dataTemperatureGraph, setDataTemperatureGraph] = useState([])
  const [dataMvTemperaureGraph, setDataMvTemperatureGraph] = useState([])
  const [mv, setMv] = useState('0')
  const [temperature, setTemperature] = useState('0')
  const [setPoint, setSetPoint] = useState('0')
  const [selectOptions, setSelectOptions] = useState([])
  const [plantId, setPlantId] = useState('')
  const [controlType, setControlType] = useState('')
  const [plantData, setPlantData] = useState([])
  const [buttonClicked, setButtonClicked] = useState(plantId)
  const [plantSelected, setPlantSelected] = useState('')

  useEffect(() => {
    const socket = socketio('http://localhost:3333')

    socket.on('data', data => {
      setTemperature(data.temperature)
      setMv(data.mv)
      setSetPoint(data.setPoint)
      setDataTemperatureGraph(data.dataToPLot)
      setDataMvTemperatureGraph(data.dataToPLot)
      setControlType(data.controlType)
      setPlantId(data.plantId)
    })
  }, [])

  useEffect(() => {
    getData()
  }, [plantId])

  function startComunication () {
    setButtonClicked(!buttonClicked)
    const plantToSend = selectOptions.find(data => data._id === plantSelected)
    if (plantSelected) {
      startComunicationApi(plantToSend).then(console.log)
    } else {
      alert('Selecione uma planta')
    }
  }

  function getData () {
    getPlantApi().then(result => {
      const planReceived = result.data.find(data => data._id === plantId)
      setPlantData(planReceived)
      setSelectOptions(result.data)
    })
  }

  const username = location.state.username
  return (
    <Main username={username} history={history}>
      <div className={styles.dashBoardContainer}>
        <div className={styles.textStyle}>
          <Text text='Dashboard' style={{ justifyContent: 'flex-start' }} />
        </div>
        <div>
          <DataView
            title='Dados' plantName={plantData ? plantData.name : buttonClicked ? 'Caregando...' : ''} controlType={controlType} plantSelected={plantId} selectOptions={selectOptions} buttonClicked={buttonClicked}
            onClick={startComunication} setPlant={setPlantSelected}
          />
        </div>
        <div className={styles.graphicContainer}>
          <div>
            <Graphic title='Temperatura' data={dataTemperatureGraph} processVariable={`${temperature}°C`} setPoint={`${setPoint}°C`} temperature scale={[22, 35]} />
          </div>
          <div>
            <Graphic title='Temperatura: Variável Manipulada (MV)' data={dataMvTemperaureGraph} mvTemperature={`${mv}%`} scale={[0, 100]} />
          </div>
        </div>
      </div>
    </Main>
  )
}
