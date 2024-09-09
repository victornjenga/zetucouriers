export const allPostsQuery = () => {
  const query = `*[_type == "products"] | order(_createdAt desc){
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
    price,slug,
    brand,postedBy->{
        _id,
        name,
        email,
        image
      },
    specs
  }`;

  return query;
};

export const postDetailQuery = (postId) => {
  const query = `*[_type == "products" && _id == '${postId}']{
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
    price,slug,
    brand,postedBy->{
        _id,
        name,
        email,
        image
      },
    specs,
  }`;

  return query;
};

export const searchPostsQuery = (searchTerm) => {
  const query = `*[_type == "products" && (name match '${searchTerm}*' || categories[]->title match '${searchTerm}*')] {
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
    price,slug,
    brand,postedBy->{
        _id,
        name,
        email,
        image
      },
    specs
  }`;

  return query;
};

export const categoryPostsQuery = (category) => {
  const query = `*[_type == "products" && '${category}' in categories[]->title] {
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
    price,slug,
    brand,postedBy->{
        _id,
        name,
        email,
        image
      },
    specs
  }`;

  return query;
};

export const brandPostsQuery = (brand) => {
  const query = `*[_type == "products" && brand match '${brand}*'] {
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
    price,slug,
    specs
  }`;

  return query;
};

export const AllCategoryPostsQuery = () => {
  const query = `*[_type == "products" && defined(categories)] {
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
    price,slug,
    brand,postedBy->{
        _id,
        name,
        email,
        image
      },
    specs
  }`;

  return query;
};

export const allCategoriesQuery = () => {
  const query = `*[_type == "category" && _id in *[_type == "products"].categories[]._ref] | order(title asc) {
    _id,
    title
  }`;

  return query;
};
