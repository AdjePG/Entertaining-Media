'use client'

import moviesSelection from "@/data/lists/moviesSelection.json"
import gamesSelection from "@/data/lists/gamesSelection.json"
import booksSelection from "@/data/lists/booksSelection.json"
import Rows from "@/components/contentsContainer/contentsRows/rows/rows"
import { useContext } from "react"
import { MediaContext } from "@/contexts/mediaContext"
import { CONTENT_TYPE } from "@/utils/constants"

const getContentSelection = (contentType : number) => {
  let contentSelection;
  
  if (contentType === CONTENT_TYPE.MOVIES) {
    contentSelection = moviesSelection
  } else if (contentType === CONTENT_TYPE.GAMES) {
    contentSelection = gamesSelection
  } else {
    contentSelection = booksSelection
  }

  return contentSelection
}

export default function ContentsRows() {
  const { contentType } = useContext(MediaContext)
  const contentSelection = getContentSelection(contentType)

  return (
    <>
      {contentSelection.map((row, index) => (
        <Rows key={index} title={row.title} selectionParams={row.params}/>
      ))}
    </>
  )
}