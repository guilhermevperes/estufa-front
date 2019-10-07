import React from 'react'
import styles from './dashboard.module.css'
import Main from '../../components/main/Main'
import Text from '../../components/text/Text'
import Graphic from '../../components/graphic/Graphic'

export default function Menu ({ history, location }) {
  const username = location.state.username
  return (
    <Main username={username}>
      <div className={styles.dashBoardContainer}>
        <div className={styles.textStyle}>
          <Text text='Dashboard' style={{ justifyContent: 'flex-start' }} />
        </div>
        <div className={styles.graphicContainer}>
          <div>
            <Graphic title='Temperatura' />
          </div>
          <div>
            <Graphic title='Umidade' />
          </div>
        </div>
      </div>
    </Main>
  )
}
