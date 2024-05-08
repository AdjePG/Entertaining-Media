'use client'

import styles from './viewHeader.module.css'
import { VIEW_TYPE } from "@/utils/constants"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBorderAll } from '@fortawesome/free-solid-svg-icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ViewHeader() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const changeViewType = (viewType : string) => {
    const params = new URLSearchParams(searchParams)

    params.set('view', viewType)

    replace(`${pathname}?${params}`)
  }

  return(
    <ul className={`${styles.list}`}>
      <li className={`${styles.listItem}`} onClick={() => changeViewType(VIEW_TYPE.ROWS)}><FontAwesomeIcon className={`${styles.itemIcon}`} icon={faBars} /><p className={`${styles.itemText}`}>Selection</p></li>
      <li className={`${styles.listItem}`} onClick={() => changeViewType(VIEW_TYPE.GRID)}><FontAwesomeIcon className={`${styles.itemIcon}`} icon={faBorderAll} /><p className={`${styles.itemText}`}>All</p></li>
    </ul>
  )
}