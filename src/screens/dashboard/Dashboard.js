import React, { useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import Main from '../../components/main/Main'
import Text from '../../components/text/Text'
import Graphic from '../../components/graphic/Graphic'
import socketio from 'socket.io-client'
import DataView from '../../components/data-view/DataView'
import { getPlantApi } from '../../api/plantApi'
import { startComunicationApi } from '../../api/arduinoApi'
import { getDataPlant, searchPlantApi } from '../../api/registerApi'
import Button from '../../components/button/Button'
import Select from '../../components/select/Select'

export default function Dashboard ({ history, location }) {
  const [dataTemperatureGraph, setDataTemperatureGraph] = useState([])
  const [registers, setRegisters] = useState([])
  const [registersSearched, setRegistersSearched] = useState([])
  const [dataMvTemperaureGraph, setDataMvTemperatureGraph] = useState([])
  const [mv, setMv] = useState('0')
  const [moisture, setMoisture] = useState('0')
  const [temperature, setTemperature] = useState('0')
  const [setPoint, setSetPoint] = useState('0')
  const [selectOptions, setSelectOptions] = useState([])
  const [plantId, setPlantId] = useState('')
  const [controlType, setControlType] = useState('')
  const [plantData, setPlantData] = useState([])
  const [buttonClicked, setButtonClicked] = useState(plantId)
  const [plantSelected, setPlantSelected] = useState('')
  const [searchPlantSelected, setSearchPlantSelected] = useState([])

  const [buttonGetDataLoading, setButtonGetDataLoading] = useState(false)
  const [buttonSearchLoading, setButtonSearchLoading] = useState(false)

  useEffect(() => {
    const socket = socketio('http://localhost:3333')

    socket.on('data', data => {
      setTemperature(data.temperature)
      setMv(data.mv)
      setMoisture(data.moisture)
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

  function getDataAllPlant () {
    setButtonGetDataLoading(true)
    getDataPlant().then(result => {
      setButtonGetDataLoading(false)
      setRegisters(result.data.teste)
    })
  }

  function searchPlantData () {
    setButtonSearchLoading(true)
    if (searchPlantSelected) {
      const temperatureSetPoint = selectOptions.find(item => item._id === searchPlantSelected)
      searchPlantApi(searchPlantSelected).then(result => {
        console.log('result :', result)
        const array = result.data.map(item => ({ pv: item.temperature, sp: temperatureSetPoint.temperature, name: item.createdAt }))
        setRegistersSearched(array)
        setButtonSearchLoading(false)
      })
    }
  }

  function startComunication () {
    if (plantSelected) {
      if (!buttonClicked) {
        setButtonClicked(!buttonClicked)
        const plantToSend = selectOptions.find(data => data._id === plantSelected)
        startComunicationApi(plantToSend, true).then(console.log)
      }
      if (buttonClicked) {
        setButtonClicked(!buttonClicked)
        startComunicationApi(false, false).then(console.log)
      }
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
            title='Dados' plantName={plantData ? plantData.name : buttonClicked ? 'Caregando...' : 'Planta não selecionada'} controlType={controlType || 'Planta não selecionada'} plantSelected={plantId} selectOptions={selectOptions} buttonClicked={buttonClicked}
            onClick={startComunication} setPlant={setPlantSelected}
          />
        </div>
        <div className={styles.graphicContainer}>
          <div>
            <Graphic title='Temperatura' data={dataTemperatureGraph} processVariable={`${temperature}°C`} setPoint={`${setPoint}°C`} temperature scale={[26, 35]} />
          </div>
          <div>
            <Graphic title='Temperatura: Variável Manipulada (MV)' data={dataMvTemperaureGraph} mvTemperature={`${mv}%`} scale={[0, 100]} />
          </div>
        </div>

        <div className={styles.graphicContainer}>
          <div>

            <div>

              <Graphic title='Umidade' data={dataMvTemperaureGraph} moisture={`${moisture}%`} scale={[0, 100]} />
            </div>
          </div>
          <div>
            <Select style={{ flex: '0.4' }} title='Selecione a planta' options={selectOptions} setValue={setSearchPlantSelected} />
            <Graphic title='Registro Planta' data={registersSearched} processVariable='$°C' setPoint={`${setPoint}°C`} temperature scale={[27, 33]} />
            <div style={{ margin: '0 auto', height: 50, display: 'flex', width: '100%', alignItems: 'flex-start', justifyContent: 'space-around' }}>

              <div style={{ width: '40%' }}>
                <Button name='Busca Dados' onClick={searchPlantData} loading={buttonSearchLoading} />

              </div>

            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}
