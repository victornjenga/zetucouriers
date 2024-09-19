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
      name: 'price',
      title: 'Price',
      type: 'string',
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
      name: 'variations',
      title: 'Variations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'variations'}]}],
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
    },
    {
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
            },
            {
              name: 'comment',
              title: 'Comment',
              type: 'text',
            },
            {
              name: 'user',
              title: 'User',
              type: 'reference',
              to: [{type: 'user'}],
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this product as featured',
    },
    {
      name: 'flashSale',
      title: 'Flash Sale',
      type: 'boolean',
      description: 'Is this product on flash sale?',
      initialValue: false,
    },
    {
      name: 'flashSaleEndTime',
      type: 'datetime',
      title: 'Flash Sale End Time',
      description: 'Set the global end time for the flash sale.',
    },
    {
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Discount percentage for flash sale',
      validation: (Rule) =>
        Rule.min(0).max(100).error('Discount percentage must be between 0 and 100'),
      hidden: ({document}) => !document?.flashSale, // Show only if flashSale is true
    },

    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: [{type: 'user'}], // Assuming you have a user schema
    },
  ],
}
