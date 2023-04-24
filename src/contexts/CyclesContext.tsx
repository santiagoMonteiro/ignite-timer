import { createContext, ReactNode, useReducer } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  createNewCycleAction,
  interruptActiveCycleAction,
  markActiveCycleAsFinishedAction,
} from '../reducers/cycles/actions'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  activeCycle: Cycle | null
  cycles: Cycle[]
  createNewCycle: (data: CreateCycleData) => void
  interruptActiveCycle: () => void
  markActiveCycleAsFinished: () => void
}

interface CyclesProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycle: null,
  })

  const { cycles, activeCycle } = cyclesState

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(createNewCycleAction(newCycle))
  }

  function resetDocumentTitle() {
    document.title = 'Ignite Timer'
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction())

    resetDocumentTitle()
  }

  function markActiveCycleAsFinished() {
    dispatch(markActiveCycleAsFinishedAction())

    resetDocumentTitle()
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        cycles,
        createNewCycle,
        interruptActiveCycle,
        markActiveCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
