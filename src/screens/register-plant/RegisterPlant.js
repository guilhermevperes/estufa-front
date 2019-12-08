import React, { useState } from 'react'
import styles from './registerPlant.module.css'
import Main from '../../components/main/Main'
import Text from '../../components/text/Text'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { registerPlantApi } from '../../api/plantApi'
import GenericModal from '../../components/modal/GenericModal'
import RegisterPlantSuccessModal from '../../screens/modals/register-plant-success-modal/RegisterPlantSuccessModal'

export default function RegisterPlant ({ history, location }) {
  const [plantName, setPlantName] = useState('')
  const [plantNameDanger, setPlantNameDanger] = useState(false)

  const [controlType, setControlType] = useState('')
  const [controlTypeDanger, setControlTypeDanger] = useState(false)

  const [temperature, setTemperature] = useState('')
  const [temperatureDanger, setTemperatureDanger] = useState(false)

  const [moisture, setMoisture] = useState('')
  const [moistureDanger, setMoistureDanger] = useState(false)

  const [timeLightStart, setTimeLightStart] = useState('')
  const [timeLightStartDanger, setTimeLightStartDanger] = useState(false)

  const [timeLightEnd, setTimeLightEnd] = useState('')
  const [timeLightEndDanger, setTimeLightEndDanger] = useState(false)

  const [isLoading, setLoading] = useState(false)

  const username = location.state.username

  const [openModal, setOpenModal] = useState(false)

  function checkData () {
    let result
    if (plantName.length === 0) {
      setPlantNameDanger(true)
      result = false
    } else result = true
    if (controlType.length === 0) {
      setControlTypeDanger(true)
      result = false
    } else result = true
    if (temperature.length === 0) {
      setTemperatureDanger(true)
      result = false
    } else result = true
    if (moisture.length === 0) {
      setMoistureDanger(true)
      result = false
    } else result = true
    if (timeLightStart.length === 0) {
      setTimeLightStartDanger(true)
      result = false
    } else result = true
    if (timeLightEnd.length === 0) {
      setTimeLightEndDanger(true)
      result = false
    } else result = true

    return result
  }

  function registerPlant () {
    setLoading(true)
    setPlantNameDanger(false)
    setControlTypeDanger(false)
    setTemperatureDanger(false)
    setMoistureDanger(false)
    setTimeLightStartDanger(false)
    setTimeLightEndDanger(false)
    const dataChecked = checkData()
    if (dataChecked) {
      registerPlantApi(plantName, controlType, temperature, moisture, timeLightStart, timeLightEnd)
        .then(result => {
          if (result.status === 'success') {
            setOpenModal(true)
          }
        })
    } else setLoading(false)
  }
  return (
    <Main username={username}>
      <div className={styles.registerPlantContainer}>
        <div className={styles.textStyle}>
          <Text text='Cadastrar Planta' style={{ justifyContent: 'flex-start' }} />
        </div>
        <div className={styles.formStyle}>
          <div className={styles.inputStyle}>
            <Input placeholder='Nome da Planta' value={plantName} setInputValue={setPlantName} danger={plantNameDanger} />
          </div>
          <div className={styles.inputStyle}>
            <Input placeholder='Controle (PID / FUZZY)' value={controlType} setInputValue={setControlType} danger={controlTypeDanger} />
          </div>
          <div className={styles.inputStyle}>
            <Input placeholder='Temperatura (°C)' value={temperature} setInputValue={setTemperature} danger={temperatureDanger} />
          </div>
          <div className={styles.inputStyle}>
            <Input placeholder='Umidade (%)' value={moisture} setInputValue={setMoisture} danger={moistureDanger} />
          </div>
          <div className={styles.inputStyle}>
            <Input placeholder='Luz (Hora de ligar)' value={timeLightStart} setInputValue={setTimeLightStart} danger={timeLightStartDanger} />
          </div>
          <div className={styles.inputStyle}>
            <Input placeholder='Luz (Hora de desligar)' value={timeLightEnd} setInputValue={setTimeLightEnd} danger={timeLightEndDanger} />
          </div>
          <div className={styles.buttonStyle}>
            <Button name='Cadastrar' onClick={registerPlant} loading={isLoading} />
          </div>
        </div>
      </div>
      <GenericModal open={openModal}>
        <RegisterPlantSuccessModal history={history} setOpen={(command) => setOpenModal(command)} username={username} />
      </GenericModal>
    </Main>
  )
}
