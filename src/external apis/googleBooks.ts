'use server'

import Book from "@/models/content/book";
import { VIEW_TYPE } from "@/utils/constants";
import { FetchGetError } from "@/utils/errors";

const GetUrlByParams = (params : any) => {
  let url : string = `https://www.googleapis.com/books/v1/volumes?maxResults=20`
  let field : string;
  let value : string;

  // Get all the parameters from the booksSelection.json to filter the books
  params.forEach((param : any) => {
    field = param.field.replace(" ","+")
    value = param.value.replace(" ","+")

    url += `&${field}=${value}` 
  })

  return url;
}

export const getBooks = async (viewType : String, page : number, params : any) => {
  const books : Book[] = [];
  const offset : number = page * 20 - 20
  let url : string
  let lastPage : boolean = false

  // Gets the fetch url depending view type mode and if there's any searching parameters
  if (viewType === VIEW_TYPE.ROWS) {
    url = GetUrlByParams(params)
  } else {
    if (params.search === undefined || params.search === "") {
      url = `https://www.googleapis.com/books/v1/volumes?q=volumes.bestsellers&orderBy=newest&startIndex=${offset}&maxResults=20`
    } else {
      url = `https://www.googleapis.com/books/v1/volumes?q=${params.search}&orderBy=relevance&startIndex=${offset}&maxResults=20`
    }
  }

  // Fetches the books from the api
  const res = await fetch(url)
  
  const data = await res.json();

  // Checks if the fetch went well. If not, show error message
  if (data.error === undefined) {
    if (data.items !== undefined) {
      data.items.forEach((book : any)=> {
        books.push(new Book(
          book.id,
          book.volumeInfo.title,
          book.volumeInfo.imageLinks?.thumbnail || null
        ))
      });
    }
  } else {
    throw new FetchGetError("Something wrong has happened. It is impossible to get the books list. Refresh or try it later.")
  }

  // Convert the array of Book objects to a JSON
  const jsonBooks : string = JSON.stringify(books)

  if (viewType === VIEW_TYPE.GRID) {
    // Checks if it's the last fetch we can do
    lastPage = data.items === undefined
  }

  return {
    jsonBooks,
    lastPage
  }
}

export const getBookDetails = async (id : number) => {
  const url : string = `https://www.googleapis.com/books/v1/volumes/${id}`

  // Fetches the selected book with a few details
  const res = await fetch(url);
  const data = await res.json();

  // Checks if the fetch went well. If not, shows error message
  if (data.error === undefined) {
    const book : Book = new Book(
      data.id,
      data.volumeInfo.title,
      data.volumeInfo.imageLinks?.small || data.volumeInfo.imageLinks?.thumbnail || null,
      Book.getCleanedDescription(data.volumeInfo.description),
      new Date(data.volumeInfo.publishedDate),
      Book.getRatePercentage(data.volumeInfo.averageRating), 
      data.volumeInfo.ratingsCount,
      data.volumeInfo.industryIdentifiers ? Book.getWebsite(data.volumeInfo.industryIdentifiers) : undefined
    );

    // Convert the Book object to a JSON
    const jsonBook : string = JSON.stringify(book)

    return {
      jsonBook
    }
  } else {
    throw new FetchGetError("Something wrong has happened. The game you're selecting right now isn't available. Refresh or try it later.")
  }
}