import React from 'react'
import styles from './graphic.module.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

export default function Graphic ({ title, ...props }) {
  const data = [
    { sp: 25, pv: 0, amt: 2400 },
    { sp: 25, pv: 10, amt: 2400 },
    { sp: 25, pv: 20, amt: 2400 },
    { sp: 25, pv: 25, amt: 2400 },
    { sp: 25, pv: 30, amt: 2400 },
    { sp: 25, pv: 40, amt: 2400 },
    { sp: 25, pv: 45, amt: 2400 },
    { sp: 25, pv: 40, amt: 2400 },
    { sp: 25, pv: 40, amt: 2400 },
    { sp: 25, pv: 30, amt: 2400 }
  ]
  return (
    <div className={styles.graphicContainer}>
      <span className={styles.titleGraphStyle}>{title}</span>
      <div className={styles.chartContainer}>
        <LineChart width={500} height={300} data={data}>
          <YAxis la />
          <XAxis />
          <Line type='monotone' dataKey='sp' stroke='red' />
          <Line type='monotone' dataKey='pv' stroke='blue' />
          <CartesianGrid stroke='#ccc' />
        </LineChart>
      </div>
    </div>
  )
}
