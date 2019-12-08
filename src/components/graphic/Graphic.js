import React from 'react'
import styles from './graphic.module.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import LegendGraph from '../legend-graph/LegendGraph'

export default function Graphic ({ title, data, temperature, mvTemperature, moisture, processVariable, setPoint, scale, ...props }) {
  function renderTemperatureGraph () {
    return (
      <LineChart width={500} height={300} data={data}>
        <Line type='monotone' dataKey='pv' stroke='blue' dot={false} />
        <Line type='monotone' dataKey='sp' stroke='red' dot={false} />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='name' />
        <YAxis domain={scale} />
        <Tooltip />
      </LineChart>
    )
  }
  function renderTemperatureLegend () {
    return (
      <>
        <LegendGraph title='Temperatura' value={processVariable} color='blue' />
        <LegendGraph title='SetPoint' value={setPoint} color='red' />
      </>
    )
  }

  function renderMVTemperatureGraph () {
    return (
      <LineChart width={500} height={300} data={data}>
        <Line type='monotone' dataKey='mv' stroke='blue' />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='name' />
        <YAxis domain={scale} />
        <Tooltip />
      </LineChart>
    )
  }

  function renderMVTemperatureLegend () {
    return (
      <>
        <LegendGraph title='Variável Manipulada' value={mvTemperature} color='blue' />
      </>
    )
  }

  function renderMoisture () {
    return (
      <LineChart width={500} height={300} data={data}>
        <Line type='monotone' dataKey='moisture' stroke='blue' />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='name' />
        <YAxis domain={scale} />
        <Tooltip />
      </LineChart>
    )
  }

  function renderMoistureLegend () {
    return (
      <>
        <LegendGraph title='Umidade' value={moisture} color='blue' />
      </>
    )
  }

  return (
    <div className={styles.graphicContainer}>
      <span className={styles.titleGraphStyle}>{title}</span>
      <div className={styles.chartContainer}>
        {temperature ? renderTemperatureGraph() : null}
        {mvTemperature ? renderMVTemperatureGraph() : null}
        {moisture ? renderMoisture() : null}
        <div className={styles.legendContainer}>
          {temperature ? renderTemperatureLegend() : null}
          {mvTemperature ? renderMVTemperatureLegend() : null}
          {moisture ? renderMoistureLegend() : null}
        </div>
      </div>
    </div>
    // <LineChart width={600} height={300} data={data}>
    //   <Line type='monotone' dataKey='uv' stroke='#8884d8' />
    //   <CartesianGrid stroke='#ccc' />
    //   <XAxis dataKey='name' />
    //   <YAxis />
    // </LineChart>
  )
}
