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
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: [{type: 'user'}], // Assuming you have a user schema
    },
  ],
}
