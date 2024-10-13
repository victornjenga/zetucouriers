import { useRouter } from "next/router";
import { client } from "../../utils/client";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { useState, useEffect } from "react";

export default function VendorProducts({ vendor, products, categories }) {
  const router = useRouter();
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState("All");

  console.log(categories);

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!vendor || !products?.length) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">
          No Products Found
        </h1>
        <p className="text-gray-500 text-lg">
          This vendor has not listed any products yet.
        </p>
      </div>
    );
  }

  const handleGenerateQRCode = async () => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(`${window.location.href}`);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const filterProductsByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.category.some((cat) => cat.title === category)
        )
      );
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          {vendor.name}'s Menu
        </h1>
        <button
          onClick={handleGenerateQRCode}
          className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition ease-in-out duration-300 shadow-lg"
        >
          Generate QR Code
        </button>
      </div>

      {qrCodeUrl && (
        <div className="my-8 flex justify-center">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-48 h-48 border border-gray-300 rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Categories Filter */}
      <div className="flex space-x-4 overflow-x-scroll py-2 scrollbar-hide mb-8">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeCategory === "All" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => filterProductsByCategory("All")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === category.title
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => filterProductsByCategory(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative w-full h-40">
              <Image
                src={product.image[0]?.asset.url || "/placeholder.jpg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {product.price && !isNaN(product.price)
                  ? `$${Number(product.price).toFixed(2)}`
                  : "Price not available"}
              </p>
              <Link href={`/${product.slug.current}`}>
                <div className="text-blue-500 font-semibold hover:underline">
                  View Details
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const query = `*[_type == "user" && role == "vendor"]{ "slug": vendorSlug.current }`;
  const vendors = await client.fetch(query);
  const paths = vendors
    .filter((vendor) => vendor.slug)
    .map((vendor) => ({ params: { slug: vendor.slug.toString() } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const vendorQuery = `*[_type == "user" && vendorSlug.current == $slug][0]`;
  const vendor = await client.fetch(vendorQuery, { slug });

  if (!vendor) return { notFound: true };

  const productsQuery = `*[_type == "products" && postedBy._ref == $vendorId]{
    _id, name, slug, price, category[]->{_id, title}, image[]{ asset->{_id, url} }
  }`;
  const products = await client.fetch(productsQuery, { vendorId: vendor._id });

  const categoriesQuery = `*[_type == "category"]{
    _id, title
  }`;
  const categories = await client.fetch(categoriesQuery);

  return {
    props: {
      vendor,
      products: products || [],
      categories: categories || [],
    },
    revalidate: 60,
  };
}
