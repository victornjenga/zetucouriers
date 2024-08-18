export const allPostsQuery = () => {
  const query = `*[_type == "sites"] | order(_createdAt desc){
    _id,
    name,
    image,
    category[]->{
      _id,
      title
    },
    variations[]->{
      _id,
      title
    },
    description,
    price,
    brand,
    specs
  }`;

  return query;
};

export const postDetailQuery = (postId) => {
  const query = `*[_type == "sites" && _id == '${postId}']{
    _id,
    name,
    image[]{
      asset->{
        _id,
        url
      }
    },
    category[]->{
      _id,
      title
    },
    variations[]->{
      _id,
      title
    },
    description,
    price,
    brand,
    specs,
  }`;

  return query;
};

export const searchPostsQuery = (searchTerm) => {
  const query = `*[_type == "sites" && (name match '${searchTerm}*' || categories[]->title match '${searchTerm}*')] {
    _id,
    name,
    image[]{
      asset->{
        _id,
        url
      }
    },
    category[]->{
      _id,
      title
    },
    variations[]->{
      _id,
      title
    },
    description,
    price,
    brand,
    specs
  }`;

  return query;
};

export const categoryPostsQuery = (category) => {
  const query = `*[_type == "sites" && '${category}' in categories[]->title] {
    _id,
    name,
    image[]{
      asset->{
        _id,
        url
      }
    },
    category[]->{
      _id,
      title
    },
    variations[]->{
      _id,
      title
    },
    description,
    price,
    brand,
    specs
  }`;

  return query;
};

export const brandPostsQuery = (brand) => {
  const query = `*[_type == "sites" && brand match '${brand}*'] {
    _id,
    name,
    image[]{
      asset->{
        _id,
        url
      }
    },
    category[]->{
      _id,
      title
    },
    variations[]->{
      _id,
      title
    },
    description,
    price,
    specs
  }`;

  return query;
};

export const AllCategoryPostsQuery = () => {
  const query = `*[_type == "sites" && defined(categories)] {
    _id,
    name,
    image[]{
      asset->{
        _id,
        url
      }
    },
    category[]->{
      _id,
      title
    },
    variations[]->{
      _id,
      title
    },
    description,
    price,
    brand,
    specs
  }`;

  return query;
};

export const allCategoriesQuery = () => {
  const query = `*[_type == "category" && _id in *[_type == "sites"].categories[]._ref] | order(title asc) {
    _id,
    title
  }`;

  return query;
};
