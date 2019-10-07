import React from 'react'
import styles from './text.module.css'

export default function Text ({ text, uppercase, ...props }) {
  return (
    <span className={styles.text} {...props}>
      {uppercase ? text.toUpperCase() : text}
    </span>
  )
}
