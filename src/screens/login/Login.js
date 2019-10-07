import React, { useState } from 'react'
import styles from './login.module.css'
import Title from '../../components/title/Title'
import SubTitle from '../../components/sub-title/SubTitle'
import Text from '../../components/text/Text'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import SmallButton from '../../components/small-button/SmallButton'
import GenericModal from '../../components/modal/GenericModal'
import ProblemModal from '../../screens/modals/problem-modal/ProblemModal'
import RegisterUserModal from '../../screens/modals/register-user-modal/RegisterUserModal'
import SimpleText from '../../components/simple-text/SimpleText'

import { loginApi } from '../../api/loginApi'

export default function Login ({ history }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isDanger, setDanger] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [userNameFocused, setUserNameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const [openProblemModal, setOpenProblemModal] = useState(false)
  const [openRegisterUserModal, setOpenRegisterUserModal] = useState(false)

  function keyDownLogin (event) {
    if (event.keyCode === 13) {
      login()
    }
  }

  function login () {
    setUserNameFocused(false)
    setPasswordFocused(false)
    setDanger(false)
    setLoading(true)
    loginApi(username, password).then(result => {
      console.log(result.data)
      if (result.status === 'success') {
        if (result.data.status === '1') {
          setLoading(false)
          history.push({ pathname: '/dashboard', state: { username: result.data.user.name } })
        } else {
          setLoading(false)
          setOpenProblemModal(true)
        }
      } else {
        if (result.data.status === '2') {
          setLoading(false)
          setDanger(true)
        } else {
          setLoading(false)
          setOpenProblemModal(true)
        }
      }
    })
  }

  function focusInput () {
    setUserNameFocused(true)
    setPasswordFocused(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text='Monitoramento Estufa' />
        <SubTitle text='TCC - Engenharia em Automação e Controle' />
      </div>
      <div className={styles.body}>
        <div className={styles.loginContainer}>
          <Text text='Login' />
          <div className={styles.dangerText}>
            {isDanger ? userNameFocused || passwordFocused ? null : <SimpleText text='Usuário e Senha Incorretos!!' color='#f70606' /> : null}
          </div>
          <div className={styles.loginBody}>
            <Input placeholder='Usuário:' value={username} setInputValue={setUsername} danger={isDanger} initialState={userNameFocused} onClick={focusInput} />
            <Input placeholder='Senha:' value={password} setInputValue={setPassword} password danger={isDanger} initialState={passwordFocused} onClick={focusInput} onKeyDown={keyDownLogin} />
          </div>
          <div className={styles.loginFooter}>
            <Button name='Login' onClick={login} loading={isLoading} onKeyPress={() => console.log('Teste')} />
            <SmallButton name='Cadastre-se' onClick={() => setOpenRegisterUserModal(true)} />
          </div>
        </div>
      </div>
      <div className={styles.footer} />
      <GenericModal open={openProblemModal} setOpen={() => setOpenProblemModal(false)}>
        <ProblemModal />
      </GenericModal>
      <GenericModal open={openRegisterUserModal} setOpen={() => setOpenRegisterUserModal(false)}>
        <RegisterUserModal setOpen={(command) => setOpenRegisterUserModal(command)} />
      </GenericModal>
    </div>
  )
}
