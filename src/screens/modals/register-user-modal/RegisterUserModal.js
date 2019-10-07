import React, { useState } from 'react'
import styles from './registerUserModal.module.css'
import Text from '../../../components/text/Text'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import { registerUserApi } from '../../../api/registerUserApi'
import SimpleText from '../../../components/simple-text/SimpleText'

export default function RegisterUserModal ({ setOpen }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [userNameFocused, setUserNameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [isDanger, setDanger] = useState(false)
  const [userCreated, setUserCreated] = useState(false)
  const [isUneditable, setUneditable] = useState(false)
  const [lengthDanger, setLengthDanger] = useState(false)

  function action () {
    setLoading(true)
    setUserNameFocused(false)
    setPasswordFocused(false)
    setDanger(false)
    if (username.length > 0 && password.length > 0) {
      setLengthDanger(false)
      if (userCreated) {
        setOpen(false)
      } else {
        register()
      }
    } else {
      setLoading(false)
      setLengthDanger(true)
    }
  }

  function register () {
    setLoading(true)
    registerUserApi(username, password).then(result => {
      if (result.status === 'success') {
        if (result.data.status === '1') {
          setUserCreated(true)
          setDanger(false)
          setUneditable(true)
          setLoading(false)
        } else if (result.data.status === '3') {
          setLoading(false)
          setDanger(true)
        }
      } else {
        setLoading(false)
      }
    })
  }

  function focusInput () {
    setUserNameFocused(true)
    setPasswordFocused(true)
  }
  return (
    <div className={styles.registerUserModalContainer}>
      <Text text='Cadastre-se' />
      <div className={styles.registerUserModalMessage}>
        {isDanger ? userNameFocused || passwordFocused ? null : <SimpleText text='Usuário já existe!' color='#f70606' /> : null}
        {userCreated ? <SimpleText text='Usuário criado com sucesso!' color='#0079b7' /> : null}
        {lengthDanger ? <SimpleText text='Por favor preencher usuário e senha!' color='#f70606' /> : null}
      </div>
      <div className={styles.registerUserModalInputContainer}>
        <Input placeholder='Usuário' value={username} setInputValue={setUsername} danger={isDanger} initialState={userNameFocused} onClick={focusInput} uneditable={isUneditable} />
        <Input placeholder='Senha' value={password} setInputValue={setPassword} danger={isDanger} initialState={passwordFocused} onClick={focusInput} uneditable={isUneditable} password />
      </div>
      <div className={styles.registerUserModalButtonContainer}>
        <Button name={userCreated ? 'Realizar Login' : 'Cadastrar'} onClick={action} loading={isLoading} />
      </div>
    </div>
  )
}
