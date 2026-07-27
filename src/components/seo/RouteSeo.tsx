import { useLocation } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from '@/components/seo/schema'
import { resolvePageSeo } from '@/content/seo'

/** Applies route-level meta tags and global structured data. */
export function RouteSeo() {
  const { pathname } = useLocation()
  const seo = resolvePageSeo(pathname)
  const isHome = pathname === '/'

  return (
    <>
      <Seo {...seo} />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      {isHome ? <JsonLd data={localBusinessSchema()} /> : null}
    </>
  )
}
