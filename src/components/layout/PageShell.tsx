import type { ReactNode } from 'react'
import { SkipLink } from '@/components/ui/SkipLink'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { StickyCtaBar } from '@/components/layout/StickyCtaBar'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { BlueprintCursor } from '@/components/motion/BlueprintCursor'
import { SmoothScroll } from '@/components/motion/SmoothScroll'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <div className="flex min-h-dvh flex-col bg-page">
        <SkipLink />
        <BlueprintCursor />
        <SiteHeader />
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <SiteFooter />
        <StickyCtaBar />
        <WhatsAppFab />
      </div>
    </SmoothScroll>
  )
}
