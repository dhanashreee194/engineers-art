import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { Label } from '@/components/ui/Label'
import { FieldError } from '@/components/ui/FieldError'
import { cn } from '@/lib/cn'

export type FormFieldProps = {
  id: string
  label: string
  required?: boolean
  error?: string
  description?: string
  className?: string
  children: ReactNode
}

export function FormField({
  id,
  label,
  required,
  error,
  description,
  className,
  children,
}: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(' ') || undefined

  const control = Children.map(children, (child) => {
    if (!isValidElement(child)) return child
    return cloneElement(child as ReactElement<Record<string, unknown>>, {
      id,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy,
      'aria-required': required || undefined,
    })
  })

  return (
    <div className={cn('w-full', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {description ? (
        <p id={descriptionId} className="mb-1.5 text-sm text-subtle">
          {description}
        </p>
      ) : null}
      {control}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
