import { cache } from 'react'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { mergeOpenGraph } from '../utilities/mergeOpenGraph'
import { getServerSideURL } from '../utilities/getURL'
import type { Media, Config } from '../payload-types'

interface GlobalWithMeta {
  meta?: {
    title?: string
    description?: string
    keywords?: string
    image?: Media | null
  }
}

type ValidGlobalSlugs =
  | 'contact'
  | 'aboutus'
  | 'homePage'
  | 'golf-center'
  | 'blog-our-news'
  | 'ourproduct'
  | 'header'
  | 'footer'

const queryPage = cache(async ({ slug }: { slug: ValidGlobalSlugs }) => {
  const payload = await getPayload({ config: configPromise })
  const result = (await payload.findGlobal({
    slug,
    depth: 1,
  })) as GlobalWithMeta | null

  return result || null
})

export async function generatePageMetadataGlobal({
  slug,
  path,

  brandName = 'บริษัท อะเบ้าท์ กราส จำกัด',
}: {
  path: string
  slug: ValidGlobalSlugs

  brandName?: string
}): Promise<Metadata> {
  const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
    const serverUrl = getServerSideURL()
    let url = serverUrl + '/api/media/file/OG.png'

    if (image && typeof image === 'object' && 'url' in image) {
      const ogUrl = image.url
      url = serverUrl + image.url
    }
    return url
  }

  const post = await queryPage({ slug })
  const ogImage = getImageURL(post?.meta?.image)
  const title = post?.meta?.title ? `${post.meta.title} | ${brandName}` : brandName

  return {
    title: post?.meta?.title,
    description: post?.meta?.description,
    keywords: post?.meta?.keywords,
    alternates: {
      canonical: `/${path}`,
    },
    openGraph: mergeOpenGraph({
      description: post?.meta?.description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
    }),
  }
}
