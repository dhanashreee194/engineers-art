import { Suspense, lazy, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { PageShell } from '@/components/layout/PageShell'
import { RouteSeo } from '@/components/seo/RouteSeo'
import { ScrollToTop } from '@/components/seo/ScrollToTop'
import { HomePage } from '@/pages/HomePage'

const DesignSystemPage = lazy(() =>
  import('@/pages/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const CapabilitiesPage = lazy(() =>
  import('@/pages/CapabilitiesPage').then((m) => ({ default: m.CapabilitiesPage })),
)
const CapabilityDetailPage = lazy(() =>
  import('@/pages/CapabilitiesPage').then((m) => ({
    default: m.CapabilityDetailPage,
  })),
)
const ProductsPage = lazy(() =>
  import('@/pages/ProductsPage').then((m) => ({ default: m.ProductsPage })),
)
const InteriorProductsPage = lazy(() =>
  import('@/pages/ProductsPage').then((m) => ({
    default: m.InteriorProductsPage,
  })),
)
const ExteriorProductsPage = lazy(() =>
  import('@/pages/ProductsPage').then((m) => ({
    default: m.ExteriorProductsPage,
  })),
)
const CustomProductsPage = lazy(() =>
  import('@/pages/ProductsPage').then((m) => ({
    default: m.CustomProductsPage,
  })),
)
const ProductDetailInteriorRoute = lazy(
  () => import('@/pages/routes/ProductDetailInteriorRoute'),
)
const ProductDetailExteriorRoute = lazy(
  () => import('@/pages/routes/ProductDetailExteriorRoute'),
)
const ProjectsPage = lazy(() =>
  import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
)
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectDetailPage })),
)
const QualityPage = lazy(() =>
  import('@/pages/QualityPage').then((m) => ({ default: m.QualityPage })),
)
const IndustriesPage = lazy(() =>
  import('@/pages/IndustriesPage').then((m) => ({ default: m.IndustriesPage })),
)
const IndustryDetailPage = lazy(() =>
  import('@/pages/IndustriesPage').then((m) => ({
    default: m.IndustryDetailPage,
  })),
)
const PrivacyPolicyPage = lazy(() => import('@/pages/routes/PrivacyPolicyPage'))
const DisclaimerPage = lazy(() => import('@/pages/routes/DisclaimerPage'))

function RouteFallback() {
  return (
    <div
      className="container-ae py-20 text-sm text-subtle"
      role="status"
      aria-live="polite"
    >
      Loading…
    </div>
  )
}

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <RouteSeo />
          <PageShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/design-system"
                element={
                  <Lazy>
                    <DesignSystemPage />
                  </Lazy>
                }
              />
              <Route
                path="/about"
                element={
                  <Lazy>
                    <AboutPage />
                  </Lazy>
                }
              />
              <Route
                path="/capabilities"
                element={
                  <Lazy>
                    <CapabilitiesPage />
                  </Lazy>
                }
              />
              <Route
                path="/capabilities/:slug"
                element={
                  <Lazy>
                    <CapabilityDetailPage />
                  </Lazy>
                }
              />
              <Route
                path="/products"
                element={
                  <Lazy>
                    <ProductsPage />
                  </Lazy>
                }
              />
              <Route
                path="/products/interior"
                element={
                  <Lazy>
                    <InteriorProductsPage />
                  </Lazy>
                }
              />
              <Route
                path="/products/exterior"
                element={
                  <Lazy>
                    <ExteriorProductsPage />
                  </Lazy>
                }
              />
              <Route
                path="/products/custom"
                element={
                  <Lazy>
                    <CustomProductsPage />
                  </Lazy>
                }
              />
              <Route
                path="/products/interior/:slug"
                element={
                  <Lazy>
                    <ProductDetailInteriorRoute />
                  </Lazy>
                }
              />
              <Route
                path="/products/exterior/:slug"
                element={
                  <Lazy>
                    <ProductDetailExteriorRoute />
                  </Lazy>
                }
              />
              <Route
                path="/projects"
                element={
                  <Lazy>
                    <ProjectsPage />
                  </Lazy>
                }
              />
              <Route
                path="/projects/:slug"
                element={
                  <Lazy>
                    <ProjectDetailPage />
                  </Lazy>
                }
              />
              <Route
                path="/quality"
                element={
                  <Lazy>
                    <QualityPage />
                  </Lazy>
                }
              />
              <Route
                path="/industries"
                element={
                  <Lazy>
                    <IndustriesPage />
                  </Lazy>
                }
              />
              <Route
                path="/industries/:slug"
                element={
                  <Lazy>
                    <IndustryDetailPage />
                  </Lazy>
                }
              />
              <Route
                path="/contact"
                element={
                  <Lazy>
                    <ContactPage />
                  </Lazy>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <Lazy>
                    <PrivacyPolicyPage />
                  </Lazy>
                }
              />
              <Route
                path="/disclaimer"
                element={
                  <Lazy>
                    <DisclaimerPage />
                  </Lazy>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageShell>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
