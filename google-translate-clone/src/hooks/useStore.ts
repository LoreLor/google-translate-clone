import { useReducer } from 'react'
import { type FromLanguage, type Action, type State, type Language } from '../utils/types'
import { AUTO_LANGUAGE } from '../utils/constants'

export const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

export const reducer = (state: State, action: Action) => {
  const { type } = action
  // CON SWITCH O IF - puedo desestructurar const {type} = action
  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state // para que no me  permita cambiar el auoto a tolanguage

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: '' // para que cuando vaya escribiendo este vacio
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  // si no hay ningun tipo => devuelvo el estado
  return state
}

export const useStore = () => {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  // me genero las funciones de action
  const interchangeLanguages = () => {
    dispatch({
      type: 'INTERCHANGE_LANGUAGES'
    })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({
      type: 'SET_FROM_LANGUAGE',
      payload
    })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({
      type: 'SET_TO_LANGUAGE',
      payload
    })
  }

  const setText = (payload: string) => {
    dispatch({
      type: 'SET_TEXT',
      payload
    })
  }

  const setResult = (payload: string) => {
    dispatch({
      type: 'SET_RESULT',
      payload
    })
  }

  return ({
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setText,
    setResult
  })
}
