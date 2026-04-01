import type { GlobalConfig } from 'payload'
import { adminGroups } from '../../utilities/adminGroups'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const golfcenter: GlobalConfig = {
  label: 'Golf Center Page',
  slug: 'golf-center',
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
          label: 'Introduction',
          fields: [
            {
              label: 'Title Header',
              name: 'titleheader',
              type: 'text',
            },
            {
              label: 'Description',
              name: 'description',
              type: 'text',
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  label: 'Button',
                  name: 'button',
                  type: 'text',
                },
                {
                  label: 'Button Link',
                  name: 'buttonlink',
                  type: 'text',
                },
              ],
            },
            {
              label: 'Video Background',
              name: 'videobackground',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Upload a video for the Golf Center Background',
              },
            },
            {
              label: 'Text Below',
              name: 'textbelow',
              type: 'text',
            },
          ],
        },
        {
          label: 'Main Facilities',
          fields: [
            {
              label: 'Main Facilities',
              name: 'mainfacilities',
              type: 'group',
              fields: [
                {
                  label: 'Title Header',
                  name: 'titleheader',
                  type: 'text',
                  defaultValue: 'Main Facilities',
                },
                {
                  label: 'Title Second',
                  name: 'titlesecond',
                  type: 'text',
                },
                {
                  label: 'Image Facility',
                  name: 'imagefacility',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  label: 'Facilities',
                  name: 'facilities',
                  type: 'array',
                  fields: [
                    {
                      label: 'Title',
                      name: 'title',
                      type: 'text',
                    },
                    {
                      label: 'Detail',
                      name: 'detail',
                      type: 'array',
                      fields: [
                        {
                          label: 'Title',
                          name: 'title',
                          type: 'text',
                        },
                        {
                          label: 'Detail',
                          name: 'detail',
                          type: 'text',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Choose your Plan',
          name: 'chooseyourplan',
          fields: [
            {
              label: 'Choose your Plan',
              name: 'whychooseus',
              type: 'group',
              fields: [
                {
                  label: 'Title Header',
                  name: 'titleheader',
                  type: 'text',
                  defaultValue: 'Choose your Plan',
                },
                {
                  label: 'Title Second',
                  name: 'titlesecond',
                  type: 'text',
                },
                {
                  label: 'Button',
                  name: 'button',
                  type: 'text',
                },
                {
                  label: 'Button Link',
                  name: 'buttonlink',
                  type: 'text',
                },
                {
                  label: 'Plan',
                  name: 'plan',
                  type: 'array',
                  fields: [
                    {
                      label: 'Title Plan',
                      name: 'titleplan',
                      type: 'text',
                    },
                    {
                      label: 'Thumbnail',
                      name: 'thumbnail',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      label: 'Video',
                      name: 'video',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      label: 'Plan Detail',
                      name: 'plandetail',
                      type: 'array',
                      fields: [
                        {
                          label: 'Title Detail',
                          name: 'titledetail',
                          type: 'text',
                          admin: {
                            description: 'ใส่ชื่อของหัวข้อรายละเอียดของแผน เช่น งบประมาณ',
                          },
                        },
                        {
                          label: 'Number Detail',
                          name: 'numberdetail',
                          type: 'text',
                          admin: {
                            description: 'ใส่จำนวนของรายละเอียดของแผน เช่น 2.5-3',
                          },
                        },
                        {
                          label: 'More Detail',
                          name: 'moredetail',
                          type: 'text',
                          admin: {
                            description: 'ใส่รายละเอียดเพิ่มเติมของแผน เช่น ล้านบาท',
                          },
                        },
                      ],
                    },
                  ],
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