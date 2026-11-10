import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskInput } from './TaskInput'

describe('TaskInput', () => {
  it('adds a task on Enter', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await user.type(screen.getByLabelText('Neue Aufgabe'), 'Kaffee holen{enter}')
    expect(onAdd).toHaveBeenCalledWith('Kaffee holen')
  })

  it('does not add anything for an empty input', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await user.type(screen.getByLabelText('Neue Aufgabe'), '   {enter}')
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('focuses the input when pressing N', () => {
    render(<TaskInput onAdd={vi.fn()} />)
    const input = screen.getByLabelText('Neue Aufgabe')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }))
    expect(input).toHaveFocus()
  })

  it('shakes the form on an empty submit', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    const { container } = render(<TaskInput onAdd={onAdd} />)
    await user.type(screen.getByLabelText('Neue Aufgabe'), '{enter}')
    expect(container.querySelector('form')?.className).toContain('animate-shake')
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('clears the field after adding', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await user.type(screen.getByLabelText('Neue Aufgabe'), 'Neu{enter}')
    expect(screen.getByLabelText('Neue Aufgabe')).toHaveValue('')
  })
})
