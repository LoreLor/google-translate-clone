import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './utils/constants'
import { ArrowIcons, ClipboardIcon, Speeker, VoiceIcon } from './components/Icons'
import SelectLanguage from './components/SelectLanguage'
import { SectionType } from './utils/types.d'
import Textarea from './components/Textarea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import image from './assets/744305.webp'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

  // me traigo el debounce y le paso los valores: estos valores son opcionales pq
  // ya tienen un valor por defecto
  const debounceFromText = useDebounce(fromText, 600)

  // me detecta los cambios en el textarea en tiempo real
  useEffect(() => {
    if (debounceFromText === '') return
    translate({ fromLanguage, toLanguage, text: debounceFromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch((err) => {
        setResult(err)
      })
  }, [debounceFromText, fromLanguage, toLanguage])

  // copy
  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
    toast.success('Your Text has been copied successfully', {
      position: 'bottom-center',
      theme: 'dark',
      autoClose: 2000
    })
    console.log(navigator.clipboard.writeText(result))
  }

  // reproduce texto se salida
  const handleSpeekerEnterText = () => {
    const msg = new SpeechSynthesisUtterance(debounceFromText)
    const voices = window.speechSynthesis.getVoices()
    msg.voice = voices[0]
    msg.rate = 0.8
    window.speechSynthesis.speak(msg)
  }

  // reproduce texto se salida
  const handleSpeekerResult = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <ToastContainer />
      <Stack style={{ marginBottom: '2rem', width: '30rem' }}>
        <img src={image} alt='logo_translate' />
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
            <div style={{ position: 'relative' }}>
              <Button
                variant='link'
                className= 'btn'
                style={{
                  position: 'absolute',
                  left: 2,
                  bottom: 0,
                  display: 'flex',
                  marginBottom: '10px',
                  marginRight: '10px',
                  transition: 'all 2s ease',
                  padding: '6px'
                }}
                >
                  <VoiceIcon />
              </Button>
              {
                 fromText === ''
                   ? null
                   : <Button
                        className='btn'
                        variant='link'
                        style={{
                          position: 'absolute',
                          left: 0,
                          bottom: 0,
                          display: 'flex',
                          marginBottom: '10px',
                          marginLeft: '50px',
                          transition: 'all 2s ease',
                          padding: '6px'
                        }}
                        onClick={handleSpeekerEnterText}
                      >
                          <Speeker />
                    </Button>
              }
            </div>
          </Stack>
        </Col>

        <Col>
        <Stack gap={2}>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowIcons />
          </Button>
        </Stack>
        </Col>

        <Col>
          <Stack gap={2}>
            <SelectLanguage
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
              <Textarea
                loading={loading}
                autoFocus
                type={SectionType.To}
                value={result}
                onChange={setResult}
            />
              {
                fromText === ''
                  ? null
                  : <div style={{ position: 'relative' }}>
                      <Button
                        className='btn'
                        variant='link'
                        style={{
                          position: 'absolute',
                          left: 2,
                          bottom: 0,
                          display: 'flex',
                          marginBottom: '10px',
                          marginRight: '10px',
                          transition: 'all 2s ease',
                          padding: '6px'
                        }}
                        onClick={handleClipboard}>
                            <ClipboardIcon />
                      </Button>
                      <Button
                        className='btn'
                        variant='link'
                        style={{
                          position: 'absolute',
                          left: 0,
                          bottom: 0,
                          display: 'flex',
                          marginBottom: '10px',
                          marginLeft: '50px',
                          transition: 'all 2s ease',
                          padding: '6px'
                        }}
                        onClick={handleSpeekerResult}
                      >
                        <Speeker />
                    </Button>
                    </div>
              }
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
