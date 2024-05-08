'use client'

import { createContext, useState } from "react";

interface MediaContext {
  contentType: number
  actualContent: string | null
  changeActualContent: (content : string) => void
}

interface Props {
  contentType: number
  actualContent: string | null
  children: React.ReactNode
}

export const MediaContext = createContext<MediaContext>({
  contentType: -1,
  actualContent: null,
  changeActualContent: () => {}
})

export function MediaProvider(props : Props) {
  const [ contentType ] = useState(props.contentType);
  const [ actualContent, setActualContent ] = useState(props.actualContent);

  const changeActualContent = (content : string) => {
    setActualContent(content)
  }

  return ( 
    <MediaContext.Provider value={
      {
        contentType,
        actualContent,
        changeActualContent,
      }
    }>
      {props.children}
    </MediaContext.Provider>
  )
}