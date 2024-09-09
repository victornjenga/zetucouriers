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
      name:"password",
      title:"Password",
      type:"string"
    }
  ],
}
