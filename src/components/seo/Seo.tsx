import { Helmet } from 'react-helmet-async'
import { defaultOgImage, SITE_URL, type PageSeo } from '@/content/seo'
import { site } from '@/content/site'

export function Seo({
  title,
  description,
  path,
  image = defaultOgImage,
  type = 'website',
  noindex = false,
}: PageSeo) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#06231F" />
    </Helmet>
  )
}
