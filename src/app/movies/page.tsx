import styles from './page.module.css'
import InfoBox from "@/components/infoBox/infoBox";
import ContentsContainer from '@/components/contentsContainer/contentsContainer';
import { CONTENT_TYPE, VIEW_TYPE } from '@/utils/constants';
import { MediaProvider } from '@/contexts/mediaContext';

export const metadata = {
  title: "Entertaining Media - Movies"
}

export default function MoviesPage({
  searchParams
} : {
  searchParams?: {
    view? : string
    search? : string
  }
}) {
  const view = searchParams?.view?.toLowerCase() !== VIEW_TYPE.GRID ? VIEW_TYPE.ROWS : VIEW_TYPE.GRID

  return (
    <MediaProvider actualContent={null} contentType={CONTENT_TYPE.MOVIES} >
      <main className={`${styles.container}`}>
        <InfoBox />
        <ContentsContainer view={view} search={searchParams?.search}/>
      </main>
    </MediaProvider>
  );
}
