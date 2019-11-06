import React from 'react'
import styles from './menu.module.css'
import MenuItem from '../menu-item/MenuItem'

export default function Menu ({ items, history, username, ...props }) {
  const userOptions = [
    { label: 'Configurações', key: 'config' },
    { label: 'Criar Novo Usuário', key: 'registerUser' }
  ]
  const plantOptions = [
    { label: 'Editar Planta', key: 'editPlant' },
    { label: 'Cadastrar Planta', key: 'registerPlant' }
  ]

  return (
    <div className={styles.menuContainer}>
      <MenuItem title='Plantas' options={plantOptions} history={history} username={username} />
      <MenuItem title='Usuários' options={userOptions} history={history} username={username} />
    </div>
  )
}
