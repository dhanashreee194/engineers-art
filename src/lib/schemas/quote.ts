import { z } from 'zod'

export const quoteIntentSchema = z.enum([
  'quote',
  'enquiry',
  'support',
  'suggestion',
  'custom',
  'other',
])

export const quoteFormSchema = z.object({
  intent: quoteIntentSchema,
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Enter a valid email'),
  phone: z
    .string()
    .trim()
    .min(8, 'Enter a valid phone number')
    .max(20, 'Enter a valid phone number'),
  company: z.string().trim().optional(),
  category: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Please add a short message'),
  website: z.string().optional(), // honeypot
})

export type QuoteFormValues = z.infer<typeof quoteFormSchema>
