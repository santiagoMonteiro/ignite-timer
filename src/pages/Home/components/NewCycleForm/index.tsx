import { useFormContext } from 'react-hook-form'
import { useCycles } from '../../../../hooks/useCycles'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import React from 'react'

export function NewCycleForm() {
  const { activeCycle } = useCycles()
  const { register } = useFormContext()

  function handleTextSelectionFromInputAfterClick(
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) {
    const minutesAmountInput = event.target as HTMLInputElement
    minutesAmountInput.select()
  }

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="projeto 1" />
        <option value="projeto 2" />
        <option value="projeto 3" />
      </datalist>

      <label htmlFor="">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        onClick={handleTextSelectionFromInputAfterClick}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
