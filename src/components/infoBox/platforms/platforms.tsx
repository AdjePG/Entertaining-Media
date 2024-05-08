'use client'

import styles from './platforms.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAndroid, faApple, faPlaystation, faWindows, faXbox } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition, faN } from '@fortawesome/free-solid-svg-icons'

interface Props {
  platforms: any[]
}

export default function Platforms(props : Props) {
  const GetPlatformIcon = (icon : IconDefinition, platforms : number[]) => {
    const platformIncluded = platforms.find((platform) => 
      props.platforms.includes(platform)
    );

    if (platformIncluded !== undefined) {
      return <FontAwesomeIcon className={`${styles.icon}`} icon={icon} />;
    }

    return null;
  }

  return (
    <div className={`${styles.platforms}`}>
      {GetPlatformIcon(faPlaystation, [7,8,9,38,46,48,167,165,390])}
      {GetPlatformIcon(faXbox, [11,12,49,169])}
      {GetPlatformIcon(faN, [4,5,18,19,20,21,22,24,33,37,41,130,137,159])}
      {GetPlatformIcon(faWindows, [6])}
      {GetPlatformIcon(faAndroid, [34])}
      {GetPlatformIcon(faApple, [14,39])}
    </div>
  )
}