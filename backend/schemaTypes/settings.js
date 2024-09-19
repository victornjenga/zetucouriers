// ./schemas/settings.js
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
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'footerDetails',
      title: 'Footer Details',
      type: 'object',
      fields: [
        {
          name: 'footerText',
          title: 'Footer Text',
          type: 'text',
        },
        {
          name: 'salesPhone',
          title: 'Sales Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'shopLocation',
          title: 'Shop Location',
          type: 'string',
        },
      ],
    },
    {
      name: 'flashSaleEndTime',
      title: 'Flash Sale End Time',
      type: 'datetime',
      description: 'Set the global end time for the flash sale.',
    },
  ],
}
