import { client } from "../utils/client";
import Image from "next/image";
import Link from "next/link";

export default function Hotels({ vendors }) {
  if (!vendors?.length) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">
          No Vendors Available
        </h1>
        <p className="text-gray-500 text-lg">
          It looks like there are no hotels or vendors available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
        Partner Hotels
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {vendors.map((vendor) => {
          // Skip vendors without a valid slug
          if (!vendor.vendorSlug?.current) return null;

          return (
            <div
              key={vendor._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Vendor Image */}
              <div className="relative w-full h-48">
                <Image
                  src={vendor.picture || "/placeholder.jpg"}
                  alt={vendor.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              {/* Vendor Details */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {vendor.name}
                </h2>

                {/* Link to Vendor's Menu */}
                <Link href={`/hotel/${vendor.vendorSlug.current}`}>
                  <div className="text-blue-500 font-semibold hover:underline">
                    View Menu
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Fetching vendors with role 'vendor'
export async function getStaticProps() {
  const query = `*[_type == "user" && role == "vendor"]{
    _id,
    name,
    picture,
    "vendorSlug": vendorSlug
  }`;

  const vendors = await client.fetch(query);

  return {
    props: {
      vendors: vendors || [],
    },
    revalidate: 60,
  };
}
