import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "uqtk61ay",
  dataset: "production",
  apiVersion: "2023-08-17", // ensure this is a valid API version
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
