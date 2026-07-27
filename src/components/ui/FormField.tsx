import type { ReactNode } from 'react'
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
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined

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
      <div
        data-describedby={describedBy}
        className="[&_[aria-describedby]]:contents"
      >
        {children}
      </div>
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
