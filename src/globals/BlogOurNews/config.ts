import type { GlobalConfig } from 'payload'
import { adminGroups } from '../../utilities/adminGroups'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const BlogOurNews: GlobalConfig = {
  label: 'Blog & Our News Page',
  slug: 'blog-our-news',
  admin: {
    group: adminGroups.pages,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          name: 'heroSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Heading',
              defaultValue: 'Blog & Our News',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              defaultValue: 'ความรู้ดีๆ และข่าวสารของ About grass ที่เราอย่างแชร์และแบ่งปัน',
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