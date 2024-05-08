import { LDSCHEME_STATUS } from "@/utils/constants";
import { useEffect, useState } from "react"

interface LightDarkMode {
  code: string
  name: string
}

export function useColorScheme() {
  useEffect(() => {
    const localStorageColorScheme : string | null = window.localStorage.getItem("ldMode")
    
    if (localStorageColorScheme) {
      const initialColorScheme : LightDarkMode = JSON.parse(localStorageColorScheme)
      
      setColorScheme(initialColorScheme)
      document.documentElement.style.colorScheme = initialColorScheme.code
    } else {
      setColorScheme({
        code : LDSCHEME_STATUS.SYSTEM,
        name : "Default"
      })
      document.documentElement.style.colorScheme = LDSCHEME_STATUS.SYSTEM
    }
  }, [])

  const [colorScheme, setColorScheme] = useState<LightDarkMode>({
    code : LDSCHEME_STATUS.SYSTEM,
    name : "Default"
  });
  
  const changeColorScheme = () => {
    let newColorScheme : LightDarkMode;
  
    if (colorScheme.code === LDSCHEME_STATUS.SYSTEM) {
      newColorScheme = {
        code : LDSCHEME_STATUS.LIGHT,
        name : "Light",
      }
    } else if (colorScheme.code === LDSCHEME_STATUS.LIGHT) {
      newColorScheme = {
        code : LDSCHEME_STATUS.DARK,
        name : "Dark"
      }
    } else {
      newColorScheme = {
        code : LDSCHEME_STATUS.SYSTEM,
        name : "Default"
      }
    }

    localStorage.setItem("ldMode", JSON.stringify(newColorScheme))
    document.documentElement.style.colorScheme = newColorScheme.code
    setColorScheme(newColorScheme)
  } 

  return {
    colorScheme,
    changeColorScheme
  }
}