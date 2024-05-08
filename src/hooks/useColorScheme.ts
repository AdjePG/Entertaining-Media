import { LDSCHEME_STATUS } from "@/utils/constants";
import { useState } from "react"

interface LightDarkMode {
  code: string
  name: string
}

export function useColorScheme() {
  const initialColorScheme : string | null = window.localStorage.getItem("ldMode")

  const [colorScheme, setColorScheme] = useState<LightDarkMode>(initialColorScheme ? JSON.parse(initialColorScheme) : {
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