// storage-adapter-import-placeholder
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ProductCollections } from './collections/Product'
import { Service } from './collections/Service/blocks/Service/config'

// Globals
import { header } from './Header/config'
import { footer } from './Footer/config'
import { home } from './globals/Home/config'
import { contact } from './globals/Contact/config'
import { aboutus } from './globals/about-us/config'
import { ourproduct } from './globals/our-product/config'
import { golfcenter } from './globals/golf-center/config'
import { BlogNewsCategories } from './collections/BlogAndNews/blocks/BlogNewsCategories/config'
import { BlogAndNews } from './collections/BlogAndNews/blocks/BlogAndNews/config'
import { BlogOurNews } from './globals/BlogOurNews/config'
import { seo } from './globals/Seo/config'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
      },
  collections: [Users, Media, ...ProductCollections, Service, BlogNewsCategories, BlogAndNews],
  globals: [header, home, footer, contact, aboutus, ourproduct, golfcenter, BlogOurNews, seo],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 25 * 1024 * 1024, // ลดเหลือ 25MB ก่อน
    },
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        [Media.slug]: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    // storage-adapter-placeholder
  ],
  onInit: async (payload) => {
    console.log('PayloadCMS initialized successfully')
    console.log('Max file size:', 50 * 1024 * 1024, 'bytes')
  },
})
