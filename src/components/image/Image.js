import React from 'react'
import styles from './image.module.css'

export default function Image ({ imgSrc, ...props }) {
  return <img className={styles.imageStyle} src={imgSrc} {...props} />
}
