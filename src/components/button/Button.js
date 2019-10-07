import React from 'react'
import styles from './button.module.css'

export default function Button ({ name, loading, ...props }) {
  const Loading = (
    <div className={styles.spinner}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
      <div className={styles.bounce3} />
    </div>
  )
  return (
    <div className={styles.buttonContainer} {...props}>
      {loading ? Loading : name}
    </div>
  )
}
