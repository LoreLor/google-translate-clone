import { useEffect, useState } from 'react'

// le paso el typo generico
export function useDebounce<T> (value: T, delay = 500) {
  const [debauncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debauncedValue
}
