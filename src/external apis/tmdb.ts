'use server'

import Movie from "@/models/content/movie";
import { VIEW_TYPE } from "@/utils/constants";
import { FetchGetError } from "@/utils/errors";

const GetUrlByParams = (params : any) => {
  let url : string = 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc'
  let field : string;
  let value : string;

  // Get all the parameters from the moviesSelection.json to filter the movies
  params.forEach((param : any) => {
    field = param.field.replace(" ","%20")
    value = param.value.replace(" ","%20")

    url += `&${field}=${value}` 
  })

  return url;
}

export const getMovies = async (viewType : String, page : number, params : any) => {
  const movies : Movie[] = [];
  let url : string;
  let lastPage : boolean = false
  
  // Gets the fetch url depending view type mode and if there's any searching parameters
  if (viewType === VIEW_TYPE.ROWS) {
    url = GetUrlByParams(params)
  } else {
    if (params.search === undefined || params.search === "") {
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
    } else {
      url = `https://api.themoviedb.org/3/search/movie?query=${params.search}&include_adult=false&language=en-US&page=${page}`
    }
  }

  // Fetches the movies from the api
  const res = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    }  
  )

  const data = await res.json();

  // Checks if the fetch went well. If not, show error message
  if (data?.success !== false) {

    // For each game, we instantiate a Movie object
    data.results.forEach((movie : any)=> {
      movies.push(new Movie(
        movie.id,
        movie.title,
        movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
      ))
    });
  } else {
    throw new FetchGetError("Something wrong has happened. It is impossible to get the movies list. Refresh or try it later.")
  }

  // Convert the array of Movie objects to a JSON
  const jsonMovies : string = JSON.stringify(movies)

  if (viewType === VIEW_TYPE.GRID) {
    // Checks if it's the last fetch we can do
    lastPage = data.total_pages <= page
  }

  return {
    jsonMovies,
    lastPage
  }
}

export const getMovieDetails = async (id : number) => {
  const url : string = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos&language=en-US`
  
  // Fetches the selected movie with a few details
  const res = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    }  
  )

  const data = await res.json();

  // Checks if the fetch went well. If not, shows error message
  if (data?.success !== false) {
    const movie : Movie = new Movie(
      data.id,
      data.title,
      data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
      data.overview,
      new Date(data.release_date),
      Math.round(Movie.getRatePercentage(data.vote_average)),
      data.vote_count,
      `https://www.themoviedb.org/movie/${data.id}`,
      Movie.getTrailer(data.videos.results),
      Movie.getDirectors(data.credits.crew)
    );

    // Convert the Movie object to a JSON
    const jsonMovie : string = JSON.stringify(movie)

    return {
      jsonMovie
    }
  } else {
    throw new FetchGetError("Something wrong has happened. The movie you're selecting right now isn't available. Refresh or try it later.")
  }
}