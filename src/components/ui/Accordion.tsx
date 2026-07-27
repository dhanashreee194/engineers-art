import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export type AccordionItem = {
  id?: string
  title: string
  content: ReactNode
}

export type AccordionProps = {
  items: AccordionItem[]
  className?: string
  allowMultiple?: boolean
}

export function Accordion({
  items,
  className,
  allowMultiple = false,
}: AccordionProps) {
  const baseId = useId()
  const [open, setOpen] = useState<string[]>([])

  function toggle(id: string) {
    setOpen((current) => {
      const isOpen = current.includes(id)
      if (allowMultiple) {
        return isOpen ? current.filter((x) => x !== id) : [...current, id]
      }
      return isOpen ? [] : [id]
    })
  }

  return (
    <div className={cn('divide-y divide-border border-y border-border', className)}>
      {items.map((item, index) => {
        const id = item.id ?? `${baseId}-${index}`
        const isOpen = open.includes(id)
        const panelId = `${id}-panel`
        const buttonId = `${id}-button`

        return (
          <div key={id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold text-primary focus-visible:outline-focus"
                onClick={() => toggle(id)}
              >
                {item.title}
                <ChevronDown
                  className={cn(
                    'size-5 shrink-0 text-subtle transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-4 text-body text-secondary"
            >
              {isOpen ? item.content : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
