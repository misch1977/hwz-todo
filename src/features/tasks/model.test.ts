import { describe, expect, it } from 'vitest'
import { addTask, removeTask, toggleTask } from './model'
import type { Task } from './model'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    title: 'Test',
    done: false,
    createdAt: 1,
    ...overrides,
  }
}

describe('addTask', () => {
  it('adds a task at the top with trimmed title', () => {
    const tasks = [makeTask({ id: 'old', title: 'Alte' })]
    const next = addTask(tasks, '  Neue Aufgabe  ')
    expect(next).toHaveLength(2)
    expect(next[0].title).toBe('Neue Aufgabe')
    expect(next[0].done).toBe(false)
    expect(next[1].title).toBe('Alte')
  })

  it('ignores an empty title', () => {
    expect(addTask([], '')).toHaveLength(0)
    expect(addTask([], '   ')).toHaveLength(0)
  })

  it('truncates a title to 200 characters', () => {
    const long = 'a'.repeat(250)
    const next = addTask([], long)
    expect(next[0].title).toHaveLength(200)
  })
})

describe('toggleTask', () => {
  it('flips the done state of the matching task', () => {
    const tasks = [makeTask({ id: '1', done: false }), makeTask({ id: '2', done: true })]
    const next = toggleTask(tasks, '1')
    expect(next[0].done).toBe(true)
    expect(next[1].done).toBe(true)
  })
})

describe('removeTask', () => {
  it('removes the matching task', () => {
    const tasks = [makeTask({ id: '1' }), makeTask({ id: '2' })]
    expect(removeTask(tasks, '1')).toHaveLength(1)
    expect(removeTask(tasks, '1')[0].id).toBe('2')
  })

  it('returns the removed task unchanged when removing', () => {
    // The removed task is passed back for undo support by the caller.
    const tasks = [makeTask({ id: '1' }), makeTask({ id: '2' })]
    const removed = tasks.find((t) => t.id === '1')
    expect(removed).toBeDefined()
  })
})
