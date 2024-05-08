import Media from "./media"

export default class Books extends Media {
  constructor(
    id : number,
    title : string,
    frontPage : string | null,
    description? : string,
    releaseDate? : Date,
    rate? : number,
    ratingCount? : number,
    website? : string
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
  }

  static getCleanedDescription(description : string | undefined) : string {
    let newDescription : string;

    if (description !== undefined) {
      newDescription = description.replace(/<br>/g, ' ').replace(/<[^>]*>/g, '')
    } else {
      newDescription = ""
    }
    
    return newDescription
  }

  static getRatePercentage(rate : number) : number {
    return (rate / 5) * 100
  }

  static getWebsite(industryIdentifiers : any) : string | undefined {
    let type : string
    let code : string

    if (industryIdentifiers) {
      const industryIdentifier = industryIdentifiers[0]

      if (industryIdentifier.type !== "OTHER") {
        type = "ISBN"
        code = industryIdentifier.identifier
      } else {
        type = industryIdentifier.identifier.split(":")[0]
        code = industryIdentifier.identifier.split(":")[1]
      }

      return `https://books.google.es/books?vid=${type}${code}`
    }
  }
}