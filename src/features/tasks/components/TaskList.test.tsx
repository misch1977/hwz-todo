import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TaskList } from './TaskList'
import type { Task } from '@/features/tasks/model'

function makeTask(id: string, title: string, done = false): Task {
  return { id, title, done, createdAt: Number(id) }
}

describe('TaskList', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows the tasks passed as props', () => {
    const tasks = [makeTask('1', 'Erste Aufgabe'), makeTask('2', 'Zweite Aufgabe', true)]
    render(
      <TaskList tasks={tasks} onToggle={() => {}} onRemove={() => {}} onRestore={() => {}} />,
    )
    expect(screen.getByText('Erste Aufgabe')).toBeInTheDocument()
    expect(screen.getByText('Zweite Aufgabe')).toBeInTheDocument()
  })
})
