export default {
  name: 'vendorSettings',
  title: 'Vendor Settings',
  type: 'document',
  fields: [
    {
      name: 'vendor',
      title: 'Vendor',
      type: 'reference',
      to: [{type: 'user'}],
      description: 'Select the vendor for these settings',
      validation: (Rule) => Rule.required().error('Vendor reference is required.'),
    },
    {
      name: 'vendorName',
      title: 'Vendor Name',
      type: 'string',
      readOnly: true, // Automatically populated based on the selected vendor
    },
    {
      name: 'description',
      title: 'Description',
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
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
              },
            },
            {
              name: 'openTime',
              title: 'Opening Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-9]{2}:[0-9]{2})$/, {
                  name: 'HH:MM',
                  invert: false,
                }).error('Enter time in HH:MM format.'),
            },
            {
              name: 'closeTime',
              title: 'Closing Time',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([0-9]{2}:[0-9]{2})$/, {
                  name: 'HH:MM',
                  invert: false,
                }).error('Enter time in HH:MM format.'),
            },
          ],
        },
      ],
    },
  ],
}
