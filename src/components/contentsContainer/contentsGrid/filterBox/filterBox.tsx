'use client'

import { poppins } from '@/utils/fonts';
import styles from './filterBox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterBox() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const getContentsByParams = (e : any) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams)
    const fields = new FormData(e.target)
    const searchInput : string = fields.get("search")?.toString() ?? ""

    if (searchInput !== "") {
      params.set("search", searchInput)
    } else {
      params.delete("search")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <h2 className={`${styles.title}`}>Search</h2>
      <form className={`${styles.filterBox}`} onSubmit={getContentsByParams}>
        <input className={`${styles.input} ${poppins.className}`} name='search' type="text" defaultValue={searchParams.get("search") || ""} placeholder='Search something you want...' />
        <button className={`${styles.search}`}><FontAwesomeIcon className={`${styles.icon}`} icon={faMagnifyingGlass} /></button>
      </form>
    </>
  )
}