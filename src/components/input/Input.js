import React from 'react'
import styles from './input.module.css'

export default function Input ({ placeholder, value, setInputValue, password, danger, initialState, uneditable, ...props }) {
  return (
    <div className={styles.inputContainer} {...props}>
      <span className={styles.placeholder}>{placeholder}</span>
      <div className={danger ? initialState ? styles.inputBorder : styles.inputBorderDanger : styles.inputBorder}>
        <input style={{ color: uneditable ? '#8a8a8a' : '#000000' }} className={styles.input} value={value} onChange={e => setInputValue(e.target.value)} type={password ? 'password' : ''} readOnly={uneditable} />
      </div>
    </div>
  )
}
