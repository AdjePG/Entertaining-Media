'use client'

import styles from './loadingComponent.module.css'

export default function LoadingComponent() {
  return (
    <div className={`${styles.loadingContainer}`}>
      <div className={`${styles.loadingBall}`}></div>
      <div className={`${styles.loadingBall}`}></div>
      <div className={`${styles.loadingBall}`}></div>
      <div className={`${styles.loadingBall}`}></div>
    </div> 
  )
}