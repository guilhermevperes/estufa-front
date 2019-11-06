import React, { useState } from 'react'
import styles from './dataView.module.css'

export default function DataView ({ title, plantName, controlType, selectOptions, plantSelected, buttonClicked, setPlant, ...props }) {
  function renderOptions () {
    return selectOptions.map((data, i) => <option key={i} defaultValue={plantSelected === data._id} value={data._id}>{data.name}</option>)
  }

  function handleClick (event) {
    setPlant(event.target.value)
  }
  return (
    <div>
      <span className={styles.titleDataViewStyle}>{title}</span>
      <div className={styles.dataContainer}>
        <span className={styles.labelStyle}>Planta:<span className={styles.labelContent}>{plantName}</span> </span>
        <span className={styles.labelStyle}>Tipo de controle:<span className={styles.labelContent}> {controlType}</span></span>
        <div style={{ flex: 0.5 }}>
          <span className={styles.labelStyle}>Selecione uma planta:
            <select onChange={handleClick}>
              {plantSelected ? null : <option value='1'>Selecione</option>}
              {renderOptions()}
            </select>
          </span>
        </div>
        <div className={buttonClicked ? styles.dataViewButtonClicked : styles.dataViewButton} {...props}>
          {buttonClicked ? 'Desligar conexão' : 'Ligar conexão'}
        </div>
      </div>
    </div>
  )
}
