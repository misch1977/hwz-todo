import { useRef, useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useHotkey } from '@/lib/useHotkey'

type TaskInputProps = {
  onAdd: (title: string) => void
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState('')
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef<HTMLDivElement>(null)

  useHotkey('n', inputRef)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const title = value.trim()
    if (!title) {
      setShaking(true)
      return
    }
    onAdd(title)
    setValue('')
  }

  return (
    <form
      className={`glass flex items-center gap-2 rounded-2xl border p-2 shadow-card ${shaking ? 'animate-shake' : ''}`}
      onAnimationEnd={() => setShaking(false)}
      onSubmit={handleSubmit}
    >
      <div ref={inputRef} className="flex min-w-0 flex-1">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-14 flex-1 border-0 bg-transparent px-4 text-lg shadow-none focus-visible:ring-0"
          placeholder="Was steht an?"
          aria-label="Neue Aufgabe"
          maxLength={200}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        className="size-12 rounded-xl bg-primary text-primary-foreground transition-look hover:scale-105 active:scale-95"
        aria-label="Aufgabe hinzufügen"
      >
        <Plus className="size-6" />
      </Button>
    </form>
  )
}
