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
        layout: 'radio', // You can use dropdown or radio buttons for selecting the role
      },
      validation: (Rule) => Rule.required(), // Ensure role is always assigned
    },
  ],
}
