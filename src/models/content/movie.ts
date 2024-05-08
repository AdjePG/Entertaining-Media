import Media from "./media"

export default class Movies extends Media {
  trailer : string | undefined
  directors : string[] | undefined

  constructor(
    id : number,
    title : string,
    frontPage : string | null,
    description? : string,
    releaseDate? : Date,
    rate? : number,
    ratingCount? : number,
    website? : string,
    trailer? : string,
    directors? : string[]
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

    this.trailer = trailer
    this.directors = directors
  }

  static getRatePercentage(rate : number) : number {
    return (rate / 10) * 100
  }

  static getTrailer(videos : any) : string | undefined {
    let trailer : string | undefined;
    let releaseDate : string = "";

    videos.forEach((video : any) => {
      if (video.type.toLowerCase() === "trailer" && 
          video.site.toLowerCase() === "youtube" &&  
          video.official === true &&
          video.published_at > releaseDate) {
        trailer = `https://www.youtube.com/watch?v=${video.key}`
      }
    })

    return trailer
  }

  static getDirectors(crew : any) : string[] {
    const directors : string[] = []

    crew.forEach((worker : any) => {
      if (worker.job.toLowerCase() === "director") {
        directors.push(worker.name)
      }
    })

    return directors
  }
}