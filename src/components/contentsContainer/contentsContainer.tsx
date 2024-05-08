import { VIEW_TYPE } from '@/utils/constants'
import styles from './contentsContainer.module.css'
import ContentsGrid from './contentsGrid/contentsGrid'
import ContentsRows from './contentsRows/contentsRows'
import ViewHeader from './viewHeader/viewHeader'

interface Props {
  view : string
  search : string | undefined
}

export default function ContentsContainer(props : Props) {
  return(
    <div className={`${styles.contentsContainer}`}>
      <ViewHeader/>
      {props.view === VIEW_TYPE.GRID ?
        <ContentsGrid search={props.search} />
      : 
        <ContentsRows />
      }
    </div>
  )
}