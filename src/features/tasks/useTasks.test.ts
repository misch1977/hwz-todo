import { describe, expect, it, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTasks } from './useTasks'
import { STORAGE_KEY } from '@/lib/storage'

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads stored tasks on first render', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        tasks: [{ id: '1', title: 'A', done: false, createdAt: 1 }],
      }),
    )
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('A')
  })

  it('adds a task and persists it', () => {
    const { result } = renderHook(() => useTasks())
    act(() => result.current.add('Neu'))
    expect(result.current.tasks[0].title).toBe('Neu')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    expect(stored.tasks[0].title).toBe('Neu')
  })

  it('undoes a removal at the original position', () => {
    const { result } = renderHook(() => useTasks())
    act(() => result.current.add('Zwei'))
    act(() => result.current.add('Eins'))
    expect(result.current.tasks.map((t) => t.title)).toEqual(['Eins', 'Zwei'])
    const id = result.current.tasks[1].id
    act(() => result.current.remove(id))
    expect(result.current.tasks.map((t) => t.title)).toEqual(['Eins'])
    act(() => result.current.undoRemove())
    expect(result.current.tasks.map((t) => t.title)).toEqual(['Eins', 'Zwei'])
  })
})
