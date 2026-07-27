import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/918766526860?text=' +
  encodeURIComponent('Hi Artistic Engineers, I would like to enquire about your products/services.')

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:brightness-105 focus-visible:outline-focus md:bottom-6"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  )
}
