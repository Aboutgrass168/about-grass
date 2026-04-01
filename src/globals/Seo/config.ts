import type { GlobalConfig } from 'payload'
import { adminGroups } from '../../utilities/adminGroups'

export const seo: GlobalConfig = {
  label: 'SEO',
  slug: 'seo',
  admin: {
    group: adminGroups.settings,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Google Analytics(GA4)',
          fields: [
            {
              name: 'ga4',
              label: 'GA4 ID',
              type: 'text',
            },
          ],
        },
        {
          label: 'Google Tag Manager(GTM)',
          fields: [
            {
              name: 'gtm',
              label: 'GTM ID',
              type: 'text',
            },
          ],
        },
        {
          label: 'Google Search Console',
          fields: [
            {
              name: 'googleSearchConsole',
              label: 'Google Search Console ID',
              type: 'text',
            },
          ],
        },
        {
          label: 'Facebook Pixel',
          fields: [
            {
              name: 'facebookPixel',
              label: 'Facebook Pixel ID',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
