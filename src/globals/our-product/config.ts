import type { GlobalConfig } from 'payload'
import { adminGroups } from '../../utilities/adminGroups'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const ourproduct: GlobalConfig = {
  label: 'Our Product Page',
  slug: 'ourproduct',
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
          label: 'Hero Section',
          name: 'heroSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Heading',
              defaultValue: 'Our Product',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
            },
          ],
        },
        {
          label: 'Categories Section',
          name: 'categorieSection',
          fields: [
            {
              name: 'productCategories',
              type: 'array',
              label: 'Product Categories',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Category Name',
                },
                {
                  name: 'slug',
                  type: 'text',
                  label: 'Category Slug',
                },
              ],
              defaultValue: [
                { name: 'All', slug: 'all' },
                { name: 'Synthetic Turf Greens', slug: 'synthetic-turf-greens' },
                { name: 'Synthetic Turf Landscape', slug: 'synthetic-turf-landscape' },
                { name: 'Multi-Sport and Playground', slug: 'multi-sport-and-playground' },
                { name: 'Finished Products', slug: 'finished-products' },
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