'use server'

import Game from "@/models/content/game";
import { VIEW_TYPE } from "@/utils/constants";
import { secondsToDate } from "@/utils/date";
import { FetchCountError, FetchGetError } from "@/utils/errors";

const GetQueryByParams = (originalQuery : string, params : any) => {
  const conditions : string[] = [];
  let condition : string;

  // Get all the parameters from the gamesSelection.json to build the query for the row
  params.forEach((param : any) => {
    condition = `${param.field} ${param.comparator} ${param.value}`

    if (param.conditionRel !== null) {
      condition += ` ${param.conditionRel}`
    }
    conditions.push(condition)
  })

  const query = `${originalQuery} where ${conditions.join(" ")}; sort total_rating_count desc;`
  return query;
}

const GetTotalResults = async(search : string | undefined) => {
  // Fetches the quantity of games
  const url : string = "https://api.igdb.com/v4/games/count"
  let options : any = {
    method: 'POST',
    headers: {
      "Client-ID": `${process.env.IGDB_CLIENT_ID}`,
      "Authorization": `Bearer ${process.env.IGDB_TOKEN}`
    }
  }

  // We filter the query if there is search parameters
  if (search !== undefined && search !== "") {
    options = {...options, body: `search "${search}";`}
  }

  const res = await fetch(url, options)
  const data = await res.json();

  // We return the quantity if the fetch went well
  if (data.count !== undefined) {
    return data.count
  } else {
    throw new FetchCountError("Something wrong has happened. Pagination system failed. Refresh or try it later.")
  }
}

export const getGames = async (viewType : String, page : number, params : any) => {
  const games : Game[] = [];
  const offset : number = page * 20 - 20
  const url : string = "https://api.igdb.com/v4/games"
  let lastPage : boolean = false
  let query : string = `fields name, cover.image_id; offset ${offset}; limit 20;`

  // Gets the fetch query depending view type mode and if there's any searching parameters
  if (viewType === VIEW_TYPE.ROWS) {
    query = GetQueryByParams(query, params)
  } else {
    if (params.search === undefined || params.search === "") {
      query = `${query} sort total_rating_count desc;`
    } else {
      query = `${query} search "${params.search}";`
    }
  }

  // Fetches the games from the api with the built query
  const res = await fetch(url,
    {
      method: 'POST',
      headers: {
        "Client-ID": `${process.env.IGDB_CLIENT_ID}`,
        "Authorization": `Bearer ${process.env.IGDB_TOKEN}`
      },
      body: query
    }  
  )

  const data = await res.json();

  // Checks if the fetch went well. If not, show error message
  if (Array.isArray(data)) {

    // For each game, we instantiate a Game object
    data.forEach((game : any)=> {
      games.push(new Game(
        game.id,
        game.name,
        game.cover ? `https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg` : null
      ))
    });
  } else {
    throw new FetchGetError("Something wrong has happened. It is impossible to get the games list. Refresh or try it later.")
  }

  // Convert the array of Game objects to a JSON
  const jsonGames : string = JSON.stringify(games)

  if (viewType === VIEW_TYPE.GRID) {
    // Checks if it's the last fetch we can do
    lastPage = await GetTotalResults(params.search) < (offset + 20)
  }
  
  return {
    jsonGames,
    lastPage
  }
}

export const getGameDetails = async (id : number) => {
  const url : string = `https://api.igdb.com/v4/games`
  
  // Fetches the selected game with a few details
  const res = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        "Client-ID": `${process.env.IGDB_CLIENT_ID}`,
        "Authorization": `Bearer ${process.env.IGDB_TOKEN}`
      },
      body: `fields name, summary, cover.image_id, first_release_date, total_rating, total_rating_count, url, genres.name, platforms; where id = ${id};`
    }  
  )

  const data = await res.json();

  // Checks if the fetch went well. If not, shows error message
  if (Array.isArray(data)) {

    //Instantiate a Game object
    const game : Game = new Game(
      data[0].id,
      data[0].name,
      data[0].cover ? `https://images.igdb.com/igdb/image/upload/t_720p/${data[0].cover.image_id}.jpg` : null,
      data[0].summary,
      secondsToDate(data[0].first_release_date),
      Math.round(data[0].total_rating),
      data[0].total_rating_count,
      data[0].url,
      data[0].genres,
      data[0].platforms
    );

    // Convert the Game object to a JSON
    const jsonGame : string = JSON.stringify(game)

    return {
      jsonGame
    }
  } else {
    throw new FetchGetError("Something wrong has happened. The game you're selecting right now isn't available. Refresh or try it later.")
  }
}