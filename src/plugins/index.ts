import { payloadCloudPlugin } from '@payloadcms/payload-cloud'

import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { getServerSideURL } from '@/utilities/getURL'

// Define a type for resources with a title property
type ResourceWithTitle = {
  title?: string
}

const generateTitle: GenerateTitle<ResourceWithTitle> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<any> = ({ doc }) => {
  return getServerSideURL()
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: 'author',
        type: 'text',
        label: 'Author',
        admin: {
          description: 'The author of this content',
        },
      },
      {
        name: 'publisher',
        type: 'text',
        label: 'Publisher',
        admin: {
          description: 'The publisher of this content',
        },
      },
      {
        name: 'lang',
        type: 'select',
        label: 'Language',
        admin: {
          description: 'The language of this content',
        },
        defaultValue: 'en',
        options: [
          {
            label: 'English',
            value: 'en',
          },
          {
            label: 'Thai',
            value: 'th',
          },
        ],
      },
    ],
  }),

  payloadCloudPlugin(),
]
