import { useEffect } from 'react'

const useDebugLogValue = (label: string, value: unknown) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(label, value)
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [value, label])
}

export default useDebugLogValue
