import React, { useState } from 'react'
import styles from './select.module.css'

export default function Select ({ title, options, setValue, ...props }) {
  const [showBox, setShowBox] = useState(false)
  const [mouseOver, setMouseOver] = useState('')
  const [plantName, setPlantName] = useState('')
  function renderOptions () {
    return options.map((item, i) => (
      <span
        key={i} className={mouseOver === i ? styles.optionStyleOver : styles.optionStyle}
        onMouseOver={() => setMouseOver(i)}
        onMouseLeave={setMouseOver}
        onClick={() => handleClick(item)}
      >{item.name}
      </span>
    ))
  }

  function handleClick (plant) {
    setShowBox(false)
    setValue(plant._id)
    setPlantName(plant.name)
  }
  return (
    <div className={styles.selectContainer} {...props}>
      <div className={styles.headerContainer} onClick={() => setShowBox(!showBox)}>
        <span className={styles.titleStyle}>{plantName || title}</span>
        <i className='fas fa-arrow-down' style={{ color: '#3cab2b', cursor: 'pointer', marginLeft: 10 }} />
      </div>
      <div className={styles.list} style={{ display: showBox ? 'flex' : 'none' }}>
        <div className={styles.listContainer}>
          {renderOptions()}
        </div>
      </div>
      <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1, display: showBox ? 'block' : 'none' }} onClick={() => setShowBox(false)} />
    </div>
  )
}
