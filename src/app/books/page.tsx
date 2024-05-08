import styles from './page.module.css';
import ContentsContainer from "@/components/contentsContainer/contentsContainer";
import InfoBox from "@/components/infoBox/infoBox";
import { MediaProvider } from "@/contexts/mediaContext";
import { CONTENT_TYPE, VIEW_TYPE } from "@/utils/constants";

export const metadata = {
  title: "Entertaining Media - Books"
}

export default function BooksPage({
  searchParams
} : {
  searchParams?: {
    view? : string
    search? : string
  }
}) {
  const view = searchParams?.view?.toLowerCase() !== VIEW_TYPE.GRID ? VIEW_TYPE.ROWS : VIEW_TYPE.GRID

  return (
    <MediaProvider actualContent={null} contentType={CONTENT_TYPE.BOOKS} >
      <main className={`${styles.container}`}>
        <InfoBox />
        <ContentsContainer view={view} search={searchParams?.search}/>
      </main>
    </MediaProvider>
  );
}
