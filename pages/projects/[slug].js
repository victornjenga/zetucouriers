import { client } from "../../utils/client"; // Adjust path as needed
import { useRouter } from "next/router";
import Link from "next/link";

const CategoryProducts = ({ products, categoryTitle }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Projects - {categoryTitle}</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-md">
              <img
                src={product.image[0].asset.url}
                alt={product.name}
                className="h-40 w-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-gray-600 italic">{product.location}</p>

              {/* Uncomment this if you have a page for product details */}
              {/* <Link href={`/product/${product.slug.current}`}>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                  View Details
                </button>
              </Link> */}
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

// Generate static paths for each category slug
export async function getStaticPaths() {
  const categoriesQuery = `*[_type == "category"]{ slug { current } }`;
  const categories = await client.fetch(categoriesQuery);

  // Filter out any categories that do not have a valid slug
  const paths = categories
    .filter((category) => category.slug?.current)
    .map((category) => ({
      params: { slug: category.slug.current },
    }));

  return {
    paths,
    fallback: true,
  };
}

// Fetch products for the selected category
export async function getStaticProps({ params }) {
  const categoryQuery = `*[_type == "category" && slug.current == $slug][0]`;
  const category = await client.fetch(categoryQuery, { slug: params.slug });

  if (!category) {
    return { notFound: true };
  }

  const productsQuery = `
    *[_type == "products" && $categoryId in category[]._ref]{
      _id,
      name,
      description,
      slug,
      location,
      image[]{
        asset -> { url }
      }
    }
  `;
  const products = await client.fetch(productsQuery, {
    categoryId: category._id,
  });

  return {
    props: {
      products,
      categoryTitle: category.title,
    },
    revalidate: 10, // Optional revalidation every 10 seconds
  };
}

export default CategoryProducts;
