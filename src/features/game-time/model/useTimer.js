import { useState, useRef, useCallback } from 'react'

export const useTimer = (initialTime = 10) => {
  const [timer, setTimer] = useState(initialTime)
  const timerIdRef = useRef(null)

  const startTimer = useCallback((time) => {
    if (timerIdRef.current) clearInterval(timerIdRef.current)
    setTimer(time)

    const id = setInterval(() => {
      setTimer(prevState => {
        if (prevState === 0) {
          clearInterval(id)
          timerIdRef.current = null
          return 0
        }
        return prevState - 1
      })
    }, 1000)

    timerIdRef.current = id
  }, [])

  return {
    timer,
    startTimer,
  }
}
