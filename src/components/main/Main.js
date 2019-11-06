import React from 'react'
import styles from './main.module.css'
import Header from '../header/Header'
import Menu from '../menu/Menu'

export default function Main ({ children, username, history, ...props }) {
  return (
    <div className={styles.mainContainer}>
      <Header username={username} />
      <div className={styles.menuChildren}>
        <Menu history={history} username={username} />
        <div className={styles.children}>
          {children}
        </div>
      </div>
    </div>
  )
}
