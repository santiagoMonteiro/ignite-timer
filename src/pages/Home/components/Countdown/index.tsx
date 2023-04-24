import { useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { useCycles } from '../../../../hooks/useCycles'

export function Countdown() {
  const { activeCycle, markActiveCycleAsFinished } = useCycles()

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  // it must have 2 characters, but if it doesn't, it has to be filled with '0' at the beginning
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    function createIntervalForPassingCycleTime() {
      return setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle!.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markActiveCycleAsFinished()
          setAmountSecondsPassed(totalSeconds)
          return
        }

        setAmountSecondsPassed(secondsDifference)
      }, 1000)
    }

    let interval: number

    if (activeCycle) {
      interval = createIntervalForPassingCycleTime()
    }

    // will be called when variables of dependecy array changes
    return () => {
      clearInterval(interval)
      setAmountSecondsPassed(0)
    }
  }, [activeCycle, totalSeconds, markActiveCycleAsFinished])

  useEffect(() => {
    function updatePageTitleWithCycleTime() {
      if (activeCycle) {
        document.title = `${minutes}:${seconds}`
      }
    }

    updatePageTitleWithCycleTime()
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
