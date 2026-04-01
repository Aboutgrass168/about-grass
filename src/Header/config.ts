import type { GlobalConfig } from 'payload'
import { adminGroups } from '../utilities/adminGroups'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateRedirects } from './hooks/revalidateRedirects'

export const header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: adminGroups.settings,
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateRedirects],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Icon',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Logo Normal',
            },
            {
              name: 'logonowhite',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Logo for White Background',
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                },
                {
                  name: 'hasDropdown',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'navigationDescription',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'dropdownItems',
                  type: 'array',
                  admin: {
                    condition: (_, siblingData) => siblingData.hasDropdown,
                  },
                  fields: [
                    {
                      name: 'dropdownImage',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
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
        {
          label: 'Button',
          fields: [
            {
              name: 'ctaButtons',
              type: 'array',
              label: 'Button',
              fields: [
                {
                  name: 'iconbutton',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Icon Button',
                  admin: {
                    description: 'รูปภาพที่จะแสดงใน Button (ใส่หรือไม่ใส่ก็ได้)',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label Button',
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                  label: 'Link Button',
                },
                {
                  name: 'variant',
                  type: 'select',
                  label: 'สีพื้นหลัง Button',
                  options: [
                    {
                      label: 'พื้นหลังมีสี',
                      value: 'primary',
                    },
                    {
                      label: 'พื้นหลังโปร่งใส',
                      value: 'secondary',
                    },
                  ],
                  defaultValue: 'primary',
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            {
              name: 'keywords',
              type: 'text',
              label: 'Keywords',
              admin: {
                description:
                  'ใส่ keywords สำหรับ SEO (คั่นด้วยเครื่องหมายจุลภาค เช่น keyword1, keyword2)',
              },
            },
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
}
