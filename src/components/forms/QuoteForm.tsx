import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import {
  quoteFormSchema,
  type QuoteFormValues,
} from '@/lib/schemas/quote'

type QuoteFormProps = {
  defaultIntent?: QuoteFormValues['intent']
  onSubmitSuccess?: (values: QuoteFormValues) => void
}

export function QuoteForm({
  defaultIntent = 'quote',
  onSubmitSuccess,
}: QuoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      intent: defaultIntent,
      name: '',
      email: '',
      phone: '',
      company: '',
      category: '',
      message: '',
      website: '',
    },
  })

  async function onSubmit(values: QuoteFormValues) {
    if (values.website) return
    // Phase 6+: wire to API endpoint
    await new Promise((r) => setTimeout(r, 400))
    onSubmitSuccess?.(values)
    reset({ ...values, message: '', website: '' })
  }

  return (
    <form
      className="relative space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormField id="intent" label="Intent" required error={errors.intent?.message}>
        <Select id="intent" invalid={!!errors.intent} {...register('intent')}>
          <option value="quote">Quote</option>
          <option value="enquiry">Enquiry</option>
          <option value="custom">Custom engineering</option>
          <option value="support">Support</option>
          <option value="suggestion">Suggestion</option>
          <option value="other">Other</option>
        </Select>
      </FormField>

      <FormField id="name" label="Your name" required error={errors.name?.message}>
        <Input
          id="name"
          autoComplete="name"
          invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="email" label="Email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </FormField>
        <FormField id="phone" label="Phone" required error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
        </FormField>
      </div>

      <FormField id="company" label="Company" error={errors.company?.message}>
        <Input id="company" autoComplete="organization" {...register('company')} />
      </FormField>

      <FormField id="category" label="Category" error={errors.category?.message}>
        <Select id="category" {...register('category')}>
          <option value="">Select…</option>
          <option value="interior">Interior products</option>
          <option value="exterior">Exterior / fabrication</option>
          <option value="custom">Custom engineering</option>
          <option value="service">Installation / service</option>
        </Select>
      </FormField>

      <FormField id="message" label="Message" required error={errors.message?.message}>
        <Textarea
          id="message"
          invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
      </FormField>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <Input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
        Submit enquiry
      </Button>

      {isSubmitSuccessful ? (
        <p className="text-sm text-success" role="status">
          Thank you. Your enquiry has been recorded (demo submit).
        </p>
      ) : null}
    </form>
  )
}
