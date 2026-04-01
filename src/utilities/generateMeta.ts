import type { Metadata } from 'next'

import type { Media, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

// Define a type for any resource that has meta and slug properties
type ResourceWithMeta = {
  meta?: {
    title?: string
    description?: string
    image?: Media | Config['db']['defaultIDType'] | null
  }
  slug?: string | string[]
}

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/OpenGraph.png'

  if (image && typeof image === 'object' && 'url' in image) {
    // Access URL directly without using sizes property
    url = serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<ResourceWithMeta> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | About Grass'
    : '404 not found | About Grass'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
