import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PageShell } from '@/components/layout/PageShell'
import { HomePage } from '@/pages/HomePage'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { ContactPage } from '@/pages/ContactPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PageShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<PlaceholderPage title="About" />} />
            <Route
              path="/capabilities"
              element={<PlaceholderPage title="Capabilities" />}
            />
            <Route path="/products" element={<PlaceholderPage title="Products" />} />
            <Route path="/projects" element={<PlaceholderPage title="Projects" />} />
            <Route path="/quality" element={<PlaceholderPage title="Quality" />} />
            <Route
              path="/industries"
              element={<PlaceholderPage title="Industries" />}
            />
            <Route
              path="/privacy-policy"
              element={<PlaceholderPage title="Privacy Policy" />}
            />
            <Route
              path="/disclaimer"
              element={<PlaceholderPage title="Disclaimer" />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageShell>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
