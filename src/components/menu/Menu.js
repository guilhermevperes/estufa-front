import React from 'react'
import styles from './menu.module.css'
import MenuItem from '../menu-item/MenuItem'

export default function Menu ({ items, ...props }) {
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
      <MenuItem title='Plantas' options={plantOptions} />
      <MenuItem title='Usuários' options={userOptions} />
    </div>
  )
}
