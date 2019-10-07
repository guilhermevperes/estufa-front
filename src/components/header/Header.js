import React from 'react'
import styles from './header.module.css'
import SubTitle from '../sub-title/SubTitle'
import GreenHouseIcon from '../../assets/HouseIcon.svg'
import Image from '../image/Image'
import UserIcon from '../../assets/UserIcon.svg'
import Text from '../text/Text'

export default function Header ({ username, ...props }) {
  return (
    <div {...props} className={styles.headerContainer}>
      <div className={styles.headerIconContainer}>
        <Image imgSrc={GreenHouseIcon} style={{ height: 24 }} />
        <div className={styles.dashboardTitle}>
          <SubTitle text='Monitoramento Estufa' style={{ height: 20 }} />
        </div>
      </div>
      <div className={styles.userContainer}>
        <Text text={username} style={{ fontSize: 16, marginRight: 10, height: 16 }} uppercase />
        <Image imgSrc={UserIcon} style={{ height: 20, cursor: 'pointer', marginRight: 10 }} />
      </div>
    </div>
  )
}
