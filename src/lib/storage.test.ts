import { describe, expect, it, beforeEach } from 'vitest'
import { loadState, saveState, STORAGE_KEY } from './storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty state when the key is missing', () => {
    const state = loadState()
    expect(state.tasks).toEqual([])
  })

  it('returns an empty state for broken JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not json')
    const state = loadState()
    expect(state.tasks).toEqual([])
  })

  it('returns an empty state for the wrong shape', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 99, notTasks: 'x' }))
    const state = loadState()
    expect(state.tasks).toEqual([])
  })

  it('saves and loads a state round-trip', () => {
    const tasks = [
      { id: '1', title: 'A', done: false, createdAt: 1 },
      { id: '2', title: 'B', done: true, createdAt: 2 },
    ]
    saveState(tasks)
    const state = loadState()
    expect(state.tasks).toEqual(tasks)
  })
})
