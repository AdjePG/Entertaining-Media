export default class Media {
  id: number;
  title: string;
  frontPage: string | null;
  description: string | undefined;
  releaseDate : Date | undefined;
  rate: number | undefined;
  ratingCount: number | undefined;
  website: string | undefined;

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
    this.id = id;
    this.title = title;
    this.frontPage = frontPage;
    this.description = description;
    this.releaseDate = releaseDate;
    this.rate = rate;
    this.ratingCount = ratingCount;
    this.website = website
  }
}