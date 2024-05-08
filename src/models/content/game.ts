import Media from "./media"

export default class Games extends Media {
  genres : string[] | undefined
  platforms : number[] | undefined

  constructor(
    id : number,
    title : string,
    frontPage : string | null,
    description? : string,
    releaseDate? : Date,
    rate? : number,
    ratingCount? : number,
    website? : string,
    genres? : string[],
    platforms? : number[]
  ) 
  {
    super(
      id, 
      title, 
      frontPage, 
      description,
      releaseDate,
      rate,
      ratingCount,
      website)

      this.genres = genres
      this.platforms = platforms
  }
}