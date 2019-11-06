import React from 'react'
import styles from './legendGraph.module.css'

export default function LegendGraph ({ title, value, color, ...props }) {
  return (
    <div className={styles.legendGraphContainer}>
      <span className={styles.titleStyle} style={{ color: color }}>{title.toUpperCase()}</span>
      <span className={styles.valueStyle}>{value.toUpperCase()}</span>
    </div>
  )
}
