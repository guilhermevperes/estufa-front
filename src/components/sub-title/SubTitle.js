import React from 'react'
import styles from './subTitle.module.css'

export default function SubTitle ({ text, ...props }) {
  return (
    <span className={styles.subTitle} {...props}>
      {text}
    </span>
  )
}
