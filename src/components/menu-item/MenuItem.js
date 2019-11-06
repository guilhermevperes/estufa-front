import React, { useState } from 'react'
import styles from './menuItem.module.css'
import Image from '../image/Image'
import MenuDot from '../../assets/menuDot.svg'

export default function MenuItem ({ title, options, history, username, ...props }) {
  const [showOptions, setShowOptions] = useState(true)
  const [mouseOver, setMouseOver] = useState(false)

  function clickOption (key) {
    switch (key) {
      case 'registerPlant': goToRegisterPlant()
    }
  }

  function goToRegisterPlant () {
    history.push({ pathname: '/register-plant', state: { username: username } })
  }

  function renderOptions () {
    return options.map((item, i) => (
      <span
        key={i}
        className={mouseOver === i ? styles.optionStyleMouseOver : styles.optionStyle}
        onMouseOver={() => setMouseOver(i)}
        onMouseLeave={() => setMouseOver()}
        onClick={() => clickOption(item.key)}
      >
        {item.label}
      </span>
    ))
  }
  return (
    <div className={styles.menuItemContaier}>
      <div className={styles.titleContainer}>
        <Image imgSrc={MenuDot} style={{ height: 10 }} />
        <span className={styles.menuItemTitle} onClick={() => setShowOptions(!showOptions)}>{title.toUpperCase()}</span>
      </div>
      {showOptions ? (
        <div className={styles.optionsContainer}>
          {renderOptions()}
        </div>
      ) : null}

    </div>
  )
}
