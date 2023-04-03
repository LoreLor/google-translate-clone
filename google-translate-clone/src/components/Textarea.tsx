import { Form } from 'react-bootstrap'
import { type FC } from 'react'
import { SectionType } from '../utils/types.d'

// este componente recibe el loading, type, value, onChange
// tipo las props
interface Props {
  autoFocus: boolean
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = { minHeight: '150px', width: '200px', border: 'none' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traduccion'
}

const Textarea: FC<Props> = ({ autoFocus, type, loading, value, onChange }) => {
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: '#f5f5f5', border: 'none' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
        as='textarea'
        disabled={type === SectionType.To}
        autoFocus={ type === SectionType.From ? autoFocus : false}
        placeholder={getPlaceholder({ type, loading })}
        style={styles}
        value={value}
        onChange={handleChange}
    />
  )
}

export default Textarea
