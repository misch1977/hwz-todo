import { useEffect, type RefObject } from 'react'

export function useHotkey(key: string, targetRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const el = event.target as Element | null
      if (typeof el?.matches === 'function' && el.matches('input, textarea, [contenteditable]')) return
      if (event.key.toLowerCase() !== key.toLowerCase()) return
      event.preventDefault()
      const node = targetRef.current
      const input = node?.querySelector?.('input') ?? node
      input?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key, targetRef])
}
