import React from 'react'
import styles from './select.module.css'

export default function Select ({ title, options, ...props }) {
  console.log('options :', options)
  return (
    <div {...props}>
      <span>{title}</span>
    </div>
  )
}
