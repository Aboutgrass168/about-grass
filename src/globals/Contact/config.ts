import type { GlobalConfig } from 'payload'
import { adminGroups } from '../../utilities/adminGroups'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const contact: GlobalConfig = {
  label: 'Contact Page',
  slug: 'contact',
  admin: {
    group: adminGroups.pages,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header & Detail',
          fields: [
            {
              name: 'header',
              type: 'text',
              required: true,
              label: 'Header Page',
            },
            {
              name: 'detail',
              type: 'textarea',
              required: true,
              label: 'Detail Page',
            },
            {
              name: 'imagelogo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Image Logo',
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'company',
              type: 'text',
              required: true,
              label: 'Company Name',
              localized: true,
            },
            {
              name: 'mapIframe',
              type: 'textarea',
              required: true,
              label: 'Google Maps Embed Code',
              admin: {
                description: 'วาง iframe code จาก Google Maps ที่นี่',
              },
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'social',
              type: 'array',
              fields: [
                {
                  name: 'imageIcon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Social Icon',
                },
                {
                  name: 'socialname',
                  type: 'text',
                  label: 'Social Name',
                  
                },
                {
                  name: 'socialurl',
                  type: 'text',
                  label: 'Social URL',
                 
                },
              ],
            },
          ],
        },
        {
          label: 'contact',
          fields: [
            {
              name: 'contactlist',
              type: 'array',
              fields: [
                {
                  name: 'imageIcon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Contact Icon',
                },
                {
                  name: 'contactname',
                  type: 'text',
                  label: 'Contact Name',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'contactdetaillist',
                  type: 'array',
                  label: 'Contact Detail List',
                  fields: [
                    {
                      name: 'contactdetail',
                      type: 'text',
                      label: 'Contact Detail',
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'contactbutton',
              type: 'group',
              fields: [
                {
                  name: 'contactbuttonicon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Contact Button icon',
                },
                {
                  name: 'contactbutton',
                  type: 'text',
                  label: 'Contact Button',
                  defaultValue: 'สอบถามผ่าน Line OA',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'contactbuttonlink',
                  type: 'text',
                  label: 'Contact Button Link',
                  admin: {
                    width: '50%',
                  },
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
                description: 'ใส่ keywords สำหรับ SEO (คั่นด้วยเครื่องหมายจุลภาค เช่น keyword1, keyword2)',
              }
            },
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        }
      ],
    },
  ],
}
