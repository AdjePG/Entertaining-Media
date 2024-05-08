import Image from 'next/image';
import styles from './page.module.css'
import { ubuntu } from '@/utils/fonts';

export const metadata = {
  title: "Entertaining Media"
}

export default function HomePage() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.frontPage}`}>
        <Image className={`${styles.background}`} src={`/images/home.png`} alt='Home portrait' width='1948' height='948' priority={true}></Image>
        <div className={`${styles.frontText}`}>
          <h1 className={`${styles.title} ${ubuntu.className}`}>What&apos;s your next thing to fight against boredom?</h1>
          <p className={`${styles.description}`}>Loads of movies, games and books that you can search available in this website. Find anything that you like!</p>
        </div>
      </div>
      <div className={`${styles.credits}`}>
        <p className={`${styles.description}`}>All data of the following contents are fetched from TMDB, IGDB and Google Books APIs</p>
        <ul className={`${styles.linksList}`}>
          <li className={`${styles.listItem}`}>
            <a className={`${styles.itemLink}`} href={`https://developer.themoviedb.org/reference/intro/getting-started`} target='_blank'>TMDB</a>
          </li>
          <li className={`${styles.listItem}`}>
            <a className={`${styles.itemLink}`} href={`https://www.igdb.com/api`} target='_blank'>IGDB</a>
          </li>
          <li className={`${styles.listItem}`}>
            <a className={`${styles.itemLink}`} href={`https://developers.google.com/books`} target='_blank'>Google Books</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
