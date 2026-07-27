import { Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'

export function StickyCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-page/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href="tel:+918766526860"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-navy-950/15 text-sm font-medium text-navy-950 focus-visible:outline-focus"
        >
          <Phone className="size-4" aria-hidden />
          Call
        </a>
        <ButtonLink to="/contact?intent=quote" className="flex-1" size="md">
          Quote
        </ButtonLink>
      </div>
    </div>
  )
}
