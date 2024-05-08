'use client'

import { poppins } from '@/utils/fonts';
import styles from './contentsGrid.module.css'
import Content from '../content/content';
import { useContents } from '@/hooks/useContents';
import FilterBox from './filterBox/filterBox';
import { useEffect, useState } from 'react';
import { VIEW_TYPE } from '@/utils/constants';
import LoadingComponent from '@/components/loadingComponent/loadingComponent';

interface Props {
  search : string | undefined
}

export default function ContentsGrid(props : Props) {
  const { contents, maxPage, error, getContents, resetContents } = useContents()
  const [ load, setLoad ] = useState(true)

  useEffect(() => {
    if (load) {
      loadContents()
    }
  }, [load])

  useEffect(() => {
    if (!load) {
      resetContents()
      setLoad(true)
    }
  }, [props.search])

  const loadContents = async() => {
    await getContents(VIEW_TYPE.GRID, {search: props.search})
    if (load) {
      setLoad(false)
    }
  }
  
  return (
    <>
      <FilterBox />
      
      {contents.length != 0 ?
        <div className={`${styles.grid}`}>
          {contents.map((content, index) => (
            <Content key={`${index}`} content={content} viewType={VIEW_TYPE.GRID} />
          ))}
        </div> 
        : 
        <>
          {!load && !error && <p className={`${styles.message}`}>There&apos;s nothing to load</p>}
        </>
      }
      
      {!load && 
        <> 
          { !maxPage && !error ?
            <button className={`${styles.load} ${poppins.className}`} onClick={() => (setLoad(true))}>Load more</button>
            : null
          }
          { error && <p className={`${styles.messageError}`}>{error}</p> }
        </>
      }

      {load && <LoadingComponent />}
    </>
  )
}