import React from 'react'
import styles from './simpleText.module.css'

export default function SimpleText ({ text, color, ...props }) {
  return <span style={{ color: color }} className={styles.simpleTextStyle} {...props}>{text.toUpperCase()}</span>
}
