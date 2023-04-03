import Form from 'react-bootstrap/Form'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../utils/constants'
import { type FC } from 'react'
import { SectionType, type FromLanguage, type Language } from '../utils/types.d'

// supported_languages es un objeto => debo sacar la key y el value con entries

// uso types pq necesito tipar con opciones
type Props =
 | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
 | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

const SelectLanguage: FC<Props> = ({ onChange, value, type }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select
      aria-label="Select language"
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
        {
            Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option
                    key={key}
                    value={key}
                >
                    {literal}
                </option>
            ))
        }
    </Form.Select>
  )
}

export default SelectLanguage
