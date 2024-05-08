import styles from "./rows.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useRef, useState } from "react"
import { useContents } from "@/hooks/useContents"
import Content from "../../content/content"
import { CONTENT_TYPE, DIRECTION_ROW_MOVE, VIEW_TYPE } from "@/utils/constants"
import { MediaContext } from "@/contexts/mediaContext"
import LoadingComponent from "@/components/loadingComponent/loadingComponent"

interface Props {
  title: string;
  selectionParams: any[]
}

const getContentStyle = (contentType : number) => {
  let contTypeStyle

  if (contentType === CONTENT_TYPE.MOVIES) {
    contTypeStyle = styles.movies
  } else if (contentType === CONTENT_TYPE.GAMES) {
    contTypeStyle = styles.games
  } else {
    contTypeStyle = styles.books
  }

  return contTypeStyle
}

export default function Rows(props : Props) {
  const { contentType } = useContext(MediaContext)

  const carouselContainerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const { error, contents, getContents } = useContents();

  const [ load, setLoad ] = useState<boolean>(true)

  const contTypeStyle = getContentStyle(contentType)

  useEffect(() => {
    if (load) {
      loadContents()
    }
  }, [load])

  const loadContents = async () => {
    const params : any = props.selectionParams

    await getContents(VIEW_TYPE.ROWS, params)
    setLoad(false)
  }

  const moveCarousel = (direction : number) => {
    if (carouselRef.current && carouselContainerRef.current) {
      if (direction === DIRECTION_ROW_MOVE.LEFT) {
        carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
      } else {
        carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
      }
    }
  }

  return (
    <>
      {!load &&
        <div className={`${styles.rows}`}>
          <h2 className={`${styles.title}`}>{props.title}</h2>
          {!error ?
            <div className={`${styles.carouselContainer}`} ref={carouselContainerRef}>
              <button className={`${styles.buttonPage} ${contTypeStyle}`} onClick={() => (moveCarousel(DIRECTION_ROW_MOVE.LEFT))}><FontAwesomeIcon icon={faChevronLeft} /></button>
              <div className={`${styles.carousel} ${contTypeStyle}`} ref={carouselRef}>
                {contents.map((content, index) => (
                  <Content key={`${index}`} content={content} viewType={VIEW_TYPE.ROWS}/>
                ))}
              </div>
              <button className={`${styles.buttonPage} ${contTypeStyle}`} onClick={() => (moveCarousel(DIRECTION_ROW_MOVE.RIGHT))}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            : 
            <p className={`${styles.messageError}`}>{error}</p>
          }
        </div>
      }

      {load && <LoadingComponent />}
    </>
  )
}