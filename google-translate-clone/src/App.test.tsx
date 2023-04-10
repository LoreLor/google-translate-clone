import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import App from './App'

test('My google test', async () => {
  // inicializo un usuario
  const user = userEvent.setup()
  // renderizo la app
  const app = render(<App />)

  // recupero el texto
  const textareaForm = app.getByPlaceholderText('Introducir texto')
  // simulo la entrada de texto
  await user.type(textareaForm, 'Hola mundo')
  const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 3000 })

  // obtengo resultado
  expect(result).toBeTruthy()
})
