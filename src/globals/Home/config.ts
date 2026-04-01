import type { GlobalConfig } from 'payload'
import { adminGroups } from '../../utilities/adminGroups'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const home: GlobalConfig = {
  label: 'Home Page',
  slug: 'homePage',
  admin: {
    group: adminGroups.pages,
  },
  //   admin part
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Banner Section
        {
          label: 'Banner',
          fields: [
            {
              name: 'slides',
              type: 'array',
              label: 'Banner Slides',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Background Image',
                  admin: {
                    description: 'Background image for this banner slide',
                  },
                },
                {
                  name: 'mainTitle',
                  type: 'text',
                  required: true,
                  label: 'Main Headline Text',
                  admin: {
                    description: 'Main headline text (e.g., "ABOUT GRASS")',
                  },
                },
                {
                  name: 'subTitle',
                  type: 'text',
                  required: true,
                  label: 'Sub-Headline Text',
                  admin: {
                    description: 'Sub-headline text in Thai',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  label: 'Description',
                  admin: {
                    description: 'Descriptive text for this banner slide',
                  },
                },
                {
                  name: 'imageIconButton',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image Icon Button',
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  required: true,
                  label: 'Button Text',
                  admin: {
                    description: 'Text for the call-to-action button',
                  },
                },
                {
                  name: 'buttonLink',
                  type: 'text',
                  required: true,
                  label: 'Button Link',
                  admin: {
                    description: 'URL for the call-to-action button',
                  },
                },
                {
                  name: 'overlayColor',
                  type: 'select',
                  label: 'Overlay Color',
                  options: [
                    {
                      label: 'Dark',
                      value: 'dark',
                    },
                    {
                      label: 'Light',
                      value: 'light',
                    },
                    {
                      label: 'None',
                      value: 'none',
                    },
                  ],
                  defaultValue: 'dark',
                  admin: {
                    description: 'Optional overlay color to improve text readability',
                  },
                },
              ],
            },
            // {
            //   name: 'settings',
            //   type: 'group',
            //   label: 'Slider Settings',
            //   fields: [
            //     {
            //       name: 'autoplay',
            //       type: 'checkbox',
            //       label: 'Enable Autoplay',
            //       defaultValue: true,
            //     },
            //     {
            //       name: 'autoplaySpeed',
            //       type: 'number',
            //       label: 'Autoplay Speed (ms)',
            //       defaultValue: 5000,
            //       admin: {
            //         condition: (data) => data?.settings?.autoplay,
            //       },
            //     },
            //     {
            //       name: 'showArrows',
            //       type: 'checkbox',
            //       label: 'Show Navigation Arrows',
            //       defaultValue: true,
            //     },
            //     {
            //       name: 'showDots',
            //       type: 'checkbox',
            //       label: 'Show Navigation Dots',
            //       defaultValue: true,
            //     },
            //     {
            //       name: 'fadeEffect',
            //       type: 'checkbox',
            //       label: 'Use Fade Effect',
            //       defaultValue: false,
            //     },
            //   ],
            // },
            {
              name: 'status',
              type: 'select',
              options: [
                {
                  label: 'Draft',
                  value: 'draft',
                },
                {
                  label: 'Published',
                  value: 'published',
                },
              ],
              defaultValue: 'draft',
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
        // Introduction Section
        {
          label: 'Introduction',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gridlayout',
              type: 'group',
              fields: [
                {
                  name: 'svg',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'Topic',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'services',
                  type: 'group',
                  fields: [
                    {
                      name: 'serviceItems',
                      type: 'array',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Our Service Section
        {
          label: 'Our Service',
          fields: [
            {
              name: 'HeaderOurServiceTop',
              type: 'text',
              required: true,
            },
            {
              name: 'HeaderOurServiceUnder',
              type: 'text',
              required: true,
            },
            {
              name: 'DescriptionOurService',
              type: 'textarea',
            },
            {
              name: 'OurServiceItems',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        // Golf Center Section
        {
          label: 'Golf Center',
          fields: [
            {
              name: 'videoBackground',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Upload a video for the Golf Center section Background',
              },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'Button',
              type: 'array',
              fields: [
                {
                  name: 'svg',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        // Our Service Process Section
        {
          label: 'Our Service Process',
          fields: [
            {
              name: 'headerOurServiceProcess',
              type: 'text',
              required: true,
            },
            {
              name: 'descriptionOurServiceProcess',
              type: 'textarea',
            },
            {
              name: 'processes',
              type: 'array',
              fields: [
                {
                  name: 'imageIcon',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        // Our Product Section
        {
          label: 'Our Product',
          fields: [
            {
              name: 'headerOurProductUpper',
              type: 'text',
              required: true,
            },
            {
              name: 'headerOurProductUnder',
              type: 'textarea',
            },
            {
              name: 'ourProductItems',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                },
                {
                  name: 'imageBackground',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'buttons',
                  type: 'group',
                  fields: [
                    {
                      name: 'labelproduct',
                      type: 'text',
                      defaultValue: 'ดูสินค้า',
                    },
                    {
                      name: 'linkproduct',
                      type: 'text',
                      defaultValue: '/product',
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Testimonial Section
        {
          label: 'Testimonial',
          fields: [
            {
              name: 'headertestimonial',
              label: 'Header Testimonial',
              type: 'text',
              required: true,
            },
            {
              name: 'Secondarytestimonial',
              label: 'Secondary Testimonial',
              type: 'text',
              required: true,
            },
            {
              name: 'descriptiontestimonial',
              label: 'Description Testimonial',
              type: 'textarea',
            },
            {
              name: 'testimonialItems',
              label: 'Testimonial Video',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  label: 'Title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'thumbnail',
                  label: 'Thumbnail',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'video',
                  label: 'Video',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'logolistloop',
              label: 'Logo List',
              type: 'array',
              fields: [
                {
                  name: 'logo',
                  label: 'Logo',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        // Contact Us Section
        {
          label: 'Contact',
          fields: [
            {
              name: 'csvIcon',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'headtext',
              type: 'text',
              required: true,
            },
            {
              name: 'text',
              type: 'textarea',
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: 'Contact us',
                },
                {
                  name: 'link',
                  type: 'text',
                  defaultValue: '/contact',
                },
              ],
            },
            {
              name: 'imageBackground',
              type: 'upload',
              relationTo: 'media',
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
