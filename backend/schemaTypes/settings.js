export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'flashSaleEndTime',
      title: 'Flash Sale End Time',
      type: 'datetime',
      description: 'Set the global end time for the flash sale.',
    },
    {
      name: 'heroBanners',
      title: 'Hero Banners',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Banner Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'altText',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.unique(), // Ensure all banner items are unique
    },
  ],
}
