import { MediaContext } from "@/contexts/mediaContext";
import { getBookDetails, getBooks } from "@/external apis/googleBooks";
import { getGameDetails, getGames } from "@/external apis/igdb";
import { getMovies, getMovieDetails } from "@/external apis/tmdb";
import Books from "@/models/content/book";
import Games from "@/models/content/game";
import Media from "@/models/content/media";
import Movies from "@/models/content/movie";
import { CONTENT_TYPE } from "@/utils/constants";
import { useContext, useState } from "react"

export function useContents() {
  const [contents, setContents] = useState<Media[]>([]);
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { contentType, changeActualContent } = useContext(MediaContext)

  const getContents = async (viewType : string, params: any) => {
    const actualPage = page + 1;
    let newContents : Media[];

    try {
      if (!maxPage) {
        if (contentType === CONTENT_TYPE.MOVIES) {
          const { jsonMovies , lastPage } = await getMovies(viewType, actualPage, params)
          newContents = <Movies[]> JSON.parse(jsonMovies)
          setMaxPage(lastPage);
        } else if (contentType === CONTENT_TYPE.GAMES) {
          const { jsonGames , lastPage } = await getGames(viewType, actualPage, params)
          newContents = <Games[]> JSON.parse(jsonGames)
          setMaxPage(lastPage);
        } else {
          const { jsonBooks , lastPage } = await getBooks(viewType, actualPage, params)
          newContents = <Books[]> JSON.parse(jsonBooks)
          setMaxPage(lastPage);
        }
        
        setPage(prevPage => prevPage + 1)
        setContents(prevMovies => [...prevMovies, ...newContents])
      }
    } catch (err : any) {
      setError(err.message)
    }
  }

  const getContentDetails = async (contentId : number) => {
    let jsonContent : string
    try {
      if (contentType === CONTENT_TYPE.MOVIES) {
        const { jsonMovie } = await getMovieDetails(contentId)
        jsonContent = jsonMovie;
      } else if (contentType === CONTENT_TYPE.GAMES) {
        const { jsonGame } = await getGameDetails(contentId)
        jsonContent = jsonGame;
      } else {
        const { jsonBook } = await getBookDetails(contentId)
        jsonContent = jsonBook;
      }

      changeActualContent(jsonContent);
    } catch (err : any) {
      setError(err.message)
    }
  }

  const resetContents = () => {
    setContents([])
    setMaxPage(false)
    setPage(0)
    setError(null)
  } 

  return {
    contents,
    page,
    maxPage,
    error,
    getContents,
    getContentDetails,
    resetContents
  }
}