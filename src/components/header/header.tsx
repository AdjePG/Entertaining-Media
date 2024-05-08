'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.css'
import { useColorScheme } from '@/hooks/useColorScheme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faGamepad, faBook, faCircleHalfStroke, faSun, faMoon} from '@fortawesome/free-solid-svg-icons'
import { LDSCHEME_STATUS } from '@/utils/constants'

export default function Header() {
  const {colorScheme, changeColorScheme} = useColorScheme()
  
  return (
    <header className={`${styles.header}`}>
      <Image className={`${styles.logo} ${styles.big}`} src={`/images/logo-big.png`} alt='EntertainingMedia Logo' width='300' height='30' priority={true} />
      <Image className={`${styles.logo} ${styles.small}`} src={`/images/logo-small.png`} alt='EntertainingMedia Logo' width='103' height='30' priority={true} />
      <nav className={`${styles.navigator}`}>
        <ul className={`${styles.list}`}>
          <li className={`${styles.listItem}`}>
            <Link className={`${styles.itemLink}`} href="/movies?view=selection"><FontAwesomeIcon className={`${styles.linkIcon}`} icon={faFilm} /><p className={`${styles.linkText}`}>Movies</p></Link>
          </li>
          <li className={`${styles.listItem}`}>
            <Link className={`${styles.itemLink}`} href="/games?view=selection"><FontAwesomeIcon className={`${styles.linkIcon}`} icon={faGamepad} /><p className={`${styles.linkText}`}>Games</p></Link>
          </li>
          <li className={`${styles.listItem}`}>
            <Link className={`${styles.itemLink}`} href="/books?view=selection"><FontAwesomeIcon className={`${styles.linkIcon}`} icon={faBook} /><p className={`${styles.linkText}`}>Books</p></Link>
          </li>
        </ul>
      </nav>
      <div className={`${styles.options}`}>
        <span className={`${styles.lightDark}`} onClick={changeColorScheme}>
          {colorScheme.code === LDSCHEME_STATUS.SYSTEM ? <FontAwesomeIcon className={`${styles.ldIcon}`} icon={faCircleHalfStroke} /> : null}
          {colorScheme.code === LDSCHEME_STATUS.LIGHT ? <FontAwesomeIcon className={`${styles.ldIcon}`} icon={faSun} /> : null}
          {colorScheme.code === LDSCHEME_STATUS.DARK ? <FontAwesomeIcon className={`${styles.ldIcon}`} icon={faMoon} /> : null}
          <p className={`${styles.ldText}`}>{colorScheme.name}</p>
        </span>
      </div>
    </header>
  )
}