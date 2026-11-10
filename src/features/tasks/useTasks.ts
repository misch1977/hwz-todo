import { useCallback, useRef, useState } from 'react'
import type { Task } from './model'
import { addTask, removeTask, toggleTask } from './model'
import { loadState, saveState } from '@/lib/storage'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadState().tasks)
  const lastRemoved = useRef<{ task: Task; position: number } | null>(null)

  const persist = useCallback((next: Task[]) => {
    setTasks(next)
    saveState(next)
  }, [])

  const add = useCallback(
    (rawTitle: string) => {
      persist(addTask(tasks, rawTitle))
    },
    [persist, tasks],
  )

  const toggle = useCallback(
    (id: string) => {
      persist(toggleTask(tasks, id))
    },
    [persist, tasks],
  )

  const remove = useCallback(
    (id: string) => {
      const position = tasks.findIndex((t) => t.id === id)
      const task = tasks[position]
      lastRemoved.current = task ? { task, position } : null
      persist(removeTask(tasks, id))
    },
    [persist, tasks],
  )

  const undoRemove = useCallback(() => {
    const entry = lastRemoved.current
    if (!entry) return
    const next = [...tasks]
    next.splice(entry.position, 0, entry.task)
    persist(next)
    lastRemoved.current = null
  }, [persist, tasks])

  return { tasks, add, toggle, remove, undoRemove }
}
