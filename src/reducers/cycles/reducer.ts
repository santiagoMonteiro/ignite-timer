import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycle: Cycle | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycle: action.payload.newCycle,
      }
    case ActionTypes.INTERRUPT_ACTIVE_CYCLE:
      return {
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycle!.id) {
            return { ...cycle, interruptedDate: new Date() }
          }
          return cycle
        }),
        activeCycle: null,
      }
    case ActionTypes.MARK_ACTIVE_CYCLE_AS_FINISHED:
      return {
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycle!.id) {
            return { ...cycle, finishedDate: new Date() }
          }
          return cycle
        }),
        activeCycle: null,
      }
    default:
      return state
  }
}
