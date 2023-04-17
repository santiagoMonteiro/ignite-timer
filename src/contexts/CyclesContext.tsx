import { createContext, ReactNode, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  activeCycle: Cycle | null
}

interface CyclesProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (activeCycle && cycle.id === activeCycle.id) {
                return { ...cycle, finishedDate: new Date() }
              }
              return cycle
            })
          )
          setAmountSecondsPassed(totalSeconds)
          return
        }
        setAmountSecondsPassed(secondsDifference)
      }, 1000)
    }

    // will be called when variables of dependecy array changes
    return () => {
      clearInterval(interval)
      setAmountSecondsPassed(0)
    }
  }, [activeCycle, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])


  function handleCreateNewCicle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycle(newCycle)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (activeCycle && cycle.id === activeCycle.id) {
          return { ...cycle, interruptedDate: new Date() }
        }
        return cycle
      })
    )

    setActiveCycle(null)
    document.title = 'Ignite Timer'
  }

  return (
    <CyclesContext.Provider>
      {children}
    </CyclesContext.Provider>
  )
}