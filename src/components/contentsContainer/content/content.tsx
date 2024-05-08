'use client'

import Image from 'next/image';
import Media from '@/models/content/media';
import styles from './content.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { CONTENT_TYPE, VIEW_TYPE } from '@/utils/constants';
import { useContents } from '@/hooks/useContents';
import { useContext } from 'react';
import { MediaContext } from '@/contexts/mediaContext';

interface Props {
  content : Media
  viewType : string
}

const getContentSizes = (contentType : number, viewType : string) => {
  let widthRatio : number;
	let heightRatio : number;

  if (contentType === CONTENT_TYPE.MOVIES) {
		widthRatio = 2;
		heightRatio = 3;
  } else if (contentType === CONTENT_TYPE.GAMES) {
		widthRatio = 3;
    heightRatio = 4;
  } else {
		widthRatio = 8;
    heightRatio = 10;
  }

  return {widthRatio, heightRatio}
}

const getContentStyles = (contentType : number, viewType : string) => {
  const viewStyle = viewType === VIEW_TYPE.GRID ? styles.grid : styles.rows
  let contTypeStyle

  if (contentType === CONTENT_TYPE.MOVIES) {
    contTypeStyle = styles.movies
  } else if (contentType === CONTENT_TYPE.GAMES) {
    contTypeStyle = styles.games
  } else {
    contTypeStyle = styles.books
  }

  return {viewStyle, contTypeStyle}
}

export default function Content(props : Props) {
  const { contentType } = useContext(MediaContext)

  const { getContentDetails } = useContents()

  const viewType = props.viewType
  const content = props.content
  
  const { viewStyle, contTypeStyle  } = getContentStyles(contentType, viewType)
  const { widthRatio, heightRatio } = getContentSizes(contentType, viewType)

  const selectContent = () => {
    getContentDetails(content.id)
  }

  return (
    <div className={`${styles.content} ${viewStyle} ${contTypeStyle}`} onClick={selectContent}>
      {content.frontPage !== null ?
        <Image className={`${styles.frontPage} ${contTypeStyle}`} src={`${content.frontPage}`} width={widthRatio * 100} height={heightRatio * 100}  alt={`Front page of '${content.title}'`} priority={true}/>
      :
        <>
          {viewType === VIEW_TYPE.GRID ? 
            <div className={`${styles.frontPage} ${styles.noImage} ${contTypeStyle}`}>
              <FontAwesomeIcon icon={faImage} />
            </div>
          :
            <p className={`${styles.frontPage} ${styles.noImage} ${contTypeStyle}`}>{content.title}</p>
          }
        </>
      }

      { viewType === VIEW_TYPE.GRID ? 
        <p className={`${styles.title}`}>{content.title}</p>
        : null
      }
    </div>
  )
}