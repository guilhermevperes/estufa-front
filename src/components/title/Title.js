import React from 'react'
import styles from './title.module.css'

export default function Title ({ text, ...props }) {
  return <span className={styles.title}>{text}</span>
}
