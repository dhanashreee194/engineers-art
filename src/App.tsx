import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PageShell } from '@/components/layout/PageShell'
import { HomePage } from '@/pages/HomePage'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { ContactPage } from '@/pages/ContactPage'
import { AboutPage } from '@/pages/AboutPage'
import {
  CapabilitiesPage,
  CapabilityDetailPage,
} from '@/pages/CapabilitiesPage'
import {
  CustomProductsPage,
  ExteriorProductsPage,
  InteriorProductsPage,
  ProductDetailPage,
  ProductsPage,
} from '@/pages/ProductsPage'
import { ProjectDetailPage, ProjectsPage } from '@/pages/ProjectsPage'
import { QualityPage } from '@/pages/QualityPage'
import { IndustriesPage, IndustryDetailPage } from '@/pages/IndustriesPage'
import { LegalPage } from '@/pages/LegalPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PageShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route
              path="/capabilities/:slug"
              element={<CapabilityDetailPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/interior" element={<InteriorProductsPage />} />
            <Route path="/products/exterior" element={<ExteriorProductsPage />} />
            <Route path="/products/custom" element={<CustomProductsPage />} />
            <Route
              path="/products/interior/:slug"
              element={<ProductDetailPage category="interior" />}
            />
            <Route
              path="/products/exterior/:slug"
              element={<ProductDetailPage category="exterior" />}
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/quality" element={<QualityPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/:slug" element={<IndustryDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/privacy-policy"
              element={
                <LegalPage
                  title="Privacy Policy"
                  summary="How Artistic Engineers handles enquiry and contact information."
                />
              }
            />
            <Route
              path="/disclaimer"
              element={
                <LegalPage
                  title="Disclaimer"
                  summary="General information about website content and service representations."
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageShell>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
