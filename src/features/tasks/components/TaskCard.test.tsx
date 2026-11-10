import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskCard } from './TaskCard'
import type { Task } from '@/features/tasks/model'

const celebrateMock = vi.hoisted(() => ({ celebrate: vi.fn() }))
vi.mock('@/lib/celebrate', () => celebrateMock)

const toastMock = vi.hoisted(() => ({ toast: vi.fn() }))
vi.mock('sonner', () => ({ toast: toastMock.toast }))

const task: Task = { id: '1', title: 'Kaffee holen', done: false, createdAt: 1 }

function renderCard(taskValue: Task = task) {
  const props = {
    onToggle: vi.fn(),
    onRemove: vi.fn(),
    onRestore: vi.fn(),
  }
  render(<TaskCard task={taskValue} {...props} />)
  return props
}

describe('TaskCard', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('shows the title and an unchecked checkbox', () => {
    renderCard()
    expect(screen.getByText('Kaffee holen')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('calls onToggle when the checkbox is clicked', async () => {
    const user = userEvent.setup()
    const props = renderCard()
    await user.click(screen.getByRole('checkbox'))
    expect(props.onToggle).toHaveBeenCalledWith('1')
  })

  it('celebrates when checking an open task', async () => {
    const user = userEvent.setup()
    celebrateMock.celebrate.mockClear()
    renderCard()
    await user.click(screen.getByRole('checkbox'))
    expect(celebrateMock.celebrate).toHaveBeenCalled()
  })

  it('calls onRemove on delete and offers an undo action', async () => {
    const user = userEvent.setup()
    const props = renderCard()
    toastMock.toast.mockClear()
    await user.click(screen.getByRole('button', { name: /löschen/i }))
    expect(props.onRemove).toHaveBeenCalledWith('1')
    const [message, options] = toastMock.toast.mock.calls[0]
    expect(message).toBe('Aufgabe gelöscht')
    expect(options.action.label).toBe('Rückgängig')
  })

  it('calls onRestore when undoing a delete', async () => {
    const props = renderCard()
    toastMock.toast.mockClear()
    // Trigger the delete so the toast action is configured, then fire it.
    await userEvent.setup().click(screen.getByRole('button', { name: /löschen/i }))
    const [, options] = toastMock.toast.mock.calls[0]
    options.action.onClick()
    expect(props.onRestore).toHaveBeenCalled()
  })
})
