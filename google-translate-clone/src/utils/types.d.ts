import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants'

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action =
| { type: 'INTERCHANGE_LANGUAGES' }
| { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
| { type: 'SET_TO_LANGUAGE', payload: Language }
| { type: 'SET_TEXT', payload: string }
| { type: 'SET_RESULT', payload: string }

export type Language = keyof typeof SUPPORTED_LANGUAGES // recupero las key de los tipos
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage // recupero el idioma ingresado automaticamente o le asigno uno

export enum SectionType {
  From = 'from',
  To = 'to'
}
