import React from 'react'
import styles from './smallButton.module.css'

export default function SmallButton ({ name, ...props }) {
  return (
    <div className={styles.smallButtonContainer} {...props}>
      {name}
    </div>
  )
}
