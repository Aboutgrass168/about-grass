import type { GlobalConfig } from 'payload'
import { adminGroups } from '../utilities/adminGroups'
import { revalidateFooter } from './hooks/revalidateFooter'

export const footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: adminGroups.settings,
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFooter],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'logo',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Pages',
          fields: [
            {
              name: 'page',
              type: 'array',
              fields: [
                {
                  name: 'pagelabel',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
