import React from "react";
import { client } from "../../utils/client"; // Adjust the import path based on your project structure

function VendorDetails({ vendor }) {
  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <div className="vendor-page">
      <h1>{vendor.name}</h1>
      <img src={vendor.picture} alt={vendor.name} />
      <p>Email: {vendor.email}</p>
      {/* Add more vendor details as needed */}
    </div>
  );
}

export default VendorDetails;

export async function getServerSideProps({ params }) {
  const { vendorSlug } = params;

  const query = `*[_type == "user" && role == "vendor" && vendorSlug.current == $vendorSlug][0]{
    name,
    email,
    picture,
    // Include any other fields you need
  }`;

  const vendor = await client.fetch(query, { vendorSlug });

  return {
    props: {
      vendor,
    },
  };
}
