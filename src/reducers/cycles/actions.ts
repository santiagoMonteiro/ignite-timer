import { Cycle } from './reducer'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  MARK_ACTIVE_CYCLE_AS_FINISHED = 'MARK_ACTIVE_CYCLE_AS_FINISHED',
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptActiveCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_ACTIVE_CYCLE,
  }
}

export function markActiveCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_ACTIVE_CYCLE_AS_FINISHED,
  }
}
