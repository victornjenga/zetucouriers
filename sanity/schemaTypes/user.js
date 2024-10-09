export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'url',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Admin', value: 'admin'},
          {title: 'Customer', value: 'customer'},
          {title: 'Vendor', value: 'vendor'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    // Slug field for vendors
    {
      name: 'vendorSlug',
      title: 'Vendor Slug',
      type: 'slug',
      options: {
        source: 'name', // Auto-generate the slug based on the vendor's name
        maxLength: 96,
      },
      hidden: ({document}) => document.role !== 'vendor', // Only show for vendors
      validation: (Rule) => Rule.required().error('Vendor slug is required for vendors'),
    },
  ],
}
