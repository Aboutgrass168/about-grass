import type { GlobalConfig } from 'payload'
import { adminGroups } from '../../utilities/adminGroups'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
export const aboutus: GlobalConfig = {
  label: 'About Us Page',
  slug: 'aboutus',
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
          label: 'Our Story',
          fields: [
            {
              name: 'headerourstory',
              type: 'text',
              required: true,
              label: 'Header Our Story',
            },
            {
              name: 'detailintro',
              type: 'textarea',
              required: true,
              label: 'Detail Intro',
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Our Story Image',
              relationTo: 'media',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'imagedetail',
              type: 'upload',
              label: 'Image Detail',
              relationTo: 'media',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'detail',
              type: 'textarea',
              required: true,
              label: 'Detail Our Story',
            },
          ],
        },
        {
          label: 'Our Mission',
          fields: [
            {
              name: 'imagebackground',
              type: 'upload',
              label: 'Image Background',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'experiencelist',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Title',
                },
                {
                  name: 'year',
                  type: 'text',
                  required: true,
                  label: 'Year',
                },
              ],
            },
            {
              name: 'imageourmission',
              type: 'upload',
              label: 'Image Our Mission',
              relationTo: 'media',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'VISION',
              type: 'group',
              fields: [
                {
                  name: 'headervision',
                  type: 'text',
                  required: true,
                  label: 'Header Vision',
                },
                {
                  name: 'detailvision',
                  type: 'textarea',
                  required: true,
                  label: 'Detail Vision',
                },
              ],
            },
            {
              name: 'ourmission',
              type: 'group',
              fields: [
                {
                  name: 'header',
                  type: 'text',
                  required: true,
                  label: 'Header Our Mission',
                },
                {
                  name: 'detailourmissionlist',
                  type: 'array',
                  label: 'Detail Our Mission List',
                  fields: [
                    {
                      name: 'detail',
                      type: 'textarea',
                      required: true,
                      label: 'Detail Our Mission',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Image Slider',
          fields: [
            {
              name: 'header',
              type: 'text',
              required: true,
              label: 'Header Image Slider',
            },
            {
              name: 'imageSlider',
              label: 'Image Slider',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Image',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Brand History',
          fields: [
            {
              name: 'headerabove',
              type: 'text',
              required: true,
              label: 'Header Above Brand History',
            },
            {
              name: 'headerbelow',
              type: 'text',
              required: true,
              label: 'Header Below Brand History',
            },
            {
              name: 'historylist',
              label: 'History List',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Image',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Title',
                },
                {
                  name: 'detail',
                  type: 'textarea',
                  required: true,
                  label: 'Detail',
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
