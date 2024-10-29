export default {
  name: 'products',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
    },
    {
      name: 'cost',
      title: 'Cost',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: [{type: 'user'}],
      description: 'The vendor who posted this product',
      validation: (Rule) =>
        Rule.custom((user, context) => {
          if (!user) return 'Vendor reference is required.'
          const vendorRole = context?.document?.postedBy?._ref
          if (vendorRole !== 'vendor') {
            return 'Only vendors can post products.'
          }
          return true
        }).error('The user must be a vendor to post products.'),
    },
  ],
}
