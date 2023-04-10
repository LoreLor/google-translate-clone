import { API_URL } from '../utils/constants'
import { type FromLanguage } from './../utils/types.d'
import axios from 'axios'

export const translate = async (body: { fromLanguage: FromLanguage, toLanguage: 'en' | 'es' | 'de' | 'fr', text: string }) => {
  try {
    const result = await axios.post(`${API_URL}/translate`, body)

    return result.data as string
  } catch (error) {
    console.error('You should complete the fields:', error)
    throw error
  }
}
