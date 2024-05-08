'use client'

import { useContext } from 'react'
import { ubuntu } from '@/utils/fonts'
import styles from './infoBox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faUser, faPlay, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { MediaContext } from '@/contexts/mediaContext'
import Image from 'next/image'
import { CONTENT_TYPE } from '@/utils/constants'
import { convertDateToString } from '@/utils/date'
import Platforms from './platforms/platforms'

const getContentSizes = (contentType : number) => {
  const width : number = 130
  let height : number;
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

	height = width * heightRatio / widthRatio 

  return {width, height, widthRatio, heightRatio}
}

const getContentStyles = (contentType : number) => {
  let contTypeStyle

  if (contentType === CONTENT_TYPE.MOVIES) {
    contTypeStyle = styles.movies
  } else if (contentType === CONTENT_TYPE.GAMES) {
    contTypeStyle = styles.games
  } else {
    contTypeStyle = styles.books
  }

  return {contTypeStyle}
}

const formatRatingCount = (ratingCount : number) => {
  if (ratingCount >= 10000 && ratingCount < 1000000) {
		return `${Math.floor(ratingCount/1000)}K`
  } else if (ratingCount >= 1000000) {
		return `${Math.floor(ratingCount/1000000)}M`
  }

  return ratingCount
}

export default function InfoBox() {
	const { contentType, actualContent } = useContext(MediaContext)

  const { contTypeStyle } = getContentStyles(contentType)
  const { widthRatio, heightRatio } = getContentSizes(contentType)

	const content = actualContent && JSON.parse(actualContent)

	if (content) {
		return (
			<aside className={`${styles.aside}`}>
				<div className={`${styles.header}`}>
					<div className={`${styles.primary}`}>
						{content.frontPage !== null ?
							<Image className={`${styles.frontPage} ${contTypeStyle}`} src={`${content.frontPage}`} width={widthRatio * 100} height={heightRatio * 100} alt={`Front page of ${content.title}`}/>
						: null}
						
						<div className={`${styles.info}`}>
							<h1 className={`${styles.title} ${ubuntu.className}`}>{content.title}</h1>
							{contentType === CONTENT_TYPE.MOVIES && 
								<>
									{content.directors.length > 0 && <p className={`${styles.info}`}>{content.directors.join(', ')}</p>}
									{content.releaseDate && <p className={`${styles.info}`}>{convertDateToString(content.releaseDate)}</p>}
								</>
							}
							{contentType === CONTENT_TYPE.GAMES && 
								<>
									{content.releaseDate && <p className={`${styles.info}`}>{convertDateToString(content.releaseDate)}</p>}
								</>
							}
						</div>
					</div>
					<div className={`${styles.secondary}`}>
						{content.ratingCount ?
							<div className={`${styles.ratingsContainer}`}>
								<p className={`${styles.text}`}>{content.rate}% <FontAwesomeIcon icon={faThumbsUp} /></p>
								<div className={`${styles.separator}`}></div>
								<p className={`${styles.text}`}>{formatRatingCount(content.ratingCount)} <FontAwesomeIcon icon={faUser} /></p>
							</div> : null
						}
						{contentType === CONTENT_TYPE.GAMES && content.platforms &&
							<Platforms platforms={content.platforms}/>
						}
					</div>
				</div>
				<div className={`${styles.body}`}>
					<p className={`${styles.description}`}>{content.description}</p>
					<ul className={`${styles.linksList}`}>
						{/* <li className={`${styles.listItem}`}>
							<Link className={`${styles.itemLink}`} href={`/${content.id}`} replace={false}><FontAwesomeIcon className={`${styles.linkIcon}`} icon={faCircleInfo} />Info</Link>
						</li> */}
						{content.website &&
							<li className={`${styles.listItem}`}>
								<a className={`${styles.itemLink}`} href={content.website} target='_blank'><FontAwesomeIcon className={`${styles.linkIcon}`} icon={faGlobe} />Website</a>
							</li>
						}
						{contentType === CONTENT_TYPE.MOVIES && content.trailer &&
							<li className={`${styles.listItem}`}>
								<a className={`${styles.itemLink}`} href={content.trailer} target='_blank'><FontAwesomeIcon className={`${styles.linkIcon}`} icon={faPlay} />Trailer</a>
							</li>
						}
					</ul>
				</div>
			</aside>
		)
	} else {
		return null
	}
}