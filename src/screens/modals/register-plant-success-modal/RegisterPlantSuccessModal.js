import React, { useState } from 'react'
import styles from './registerPlantSuccessModal.module.css'
import Text from '../../../components/text/Text'
import Button from '../../../components/button/Button'

export default function RegisterPlantSuccessModal ({ setOpen, history, username }) {
  const [isLoading, setLoading] = useState(false)

  function backToDashBoard () {
    setLoading(true)
    history.push({ pathname: '/dashboard', state: { username } })
    setOpen(false)
  }

  return (
    <div className={styles.registerUserModalContainer}>
      <Text text='Planta Cadastrada com Sucesso!' />

      <div className={styles.registerUserModalButtonContainer}>
        <Button name='Voltar para tela inicial' onClick={backToDashBoard} loading={isLoading} />
      </div>
    </div>
  )
}
