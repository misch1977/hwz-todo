import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressRing } from './ProgressRing'

describe('ProgressRing', () => {
  it('announces done of total', () => {
    render(<ProgressRing done={1} total={2} />)
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '1 von 2 erledigt')
  })

  it('shows the fraction in the center', () => {
    render(<ProgressRing done={3} total={5} />)
    expect(screen.getByText('3/5')).toBeInTheDocument()
  })

  it('shows 0/0 when there are no tasks', () => {
    render(<ProgressRing done={0} total={0} />)
    expect(screen.getByText('0/0')).toBeInTheDocument()
  })
})
