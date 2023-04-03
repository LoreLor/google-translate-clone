import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './utils/constants'
import { ArrowIcons } from './components/Icons'
import SelectLanguage from './components/SelectLanguage'
import { SectionType } from './utils/types.d'
import Textarea from './components/Textarea'

// 1 initialState
// 2  me creo las actions
// 3 :reducer recibe el estado y una accion

function App () {
  const {
    fromLanguage,
    setFromLanguage,
    toLanguage,
    setToLanguage,
    fromText,
    setText,
    result,
    setResult,
    interchangeLanguages,
    loading
   
  } = useStore()

  return (
    <Container fluid>
      <Stack style={{ marginLeft: '50px', marginBottom: '2rem' }}>
        <h1>Google Translate</h1>
      </Stack>
      <Row>
        <Col>
          <Stack gap={2}>
            <SelectLanguage
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
              <Textarea
              autoFocus
              type={SectionType.From}
              value={fromText}
              onChange={setText}
              />
          </Stack>
        </Col>

        <Col>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowIcons />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <SelectLanguage
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
              <Textarea
                autoFocus
                type={SectionType.To}
                value={result}
                onChange={setResult}
                loading={loading}
          
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
