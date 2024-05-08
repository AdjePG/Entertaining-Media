import styles from './not-found.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
 
export const metadata = {
  title: "Entertaining Media"
}

export default function NotFound() {
  return (
    <div className={`${styles.container}`}>
      <FontAwesomeIcon className={`${styles.icon}`} icon={faTriangleExclamation} />
      <p className={`${styles.message}`}>Ooops! The site you have searched does not exist.</p>
    </div>
  )
}