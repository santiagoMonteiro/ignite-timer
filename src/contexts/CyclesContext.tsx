import { createContext, ReactNode, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

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
  cycles: Cycle[]
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
  markCycleAsFinished: () => void
}

interface CyclesProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null)

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycle(newCycle)
  }

  function resetActiveCycle() {
    setActiveCycle(null)
    document.title = 'Ignite Timer'
  }

  function interruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycle!.id) {
          return { ...cycle, interruptedDate: new Date() }
        }
        return cycle
      }),
    )

    resetActiveCycle()
  }

  function markCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycle!.id) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
    resetActiveCycle()
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        createNewCycle,
        interruptCycle,
        markCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
