// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { AllCategoryPostsQuery } from "../../../utils/queries";
// import { client } from "../../../utils/client";
// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const query = AllCategoryPostsQuery();
//     const data = await client.fetch(query);

//     res.status(200).json(data);
//   }
//     else if (req.method === "POST") {
//       const doc = req.body;

//       client.create(doc).then(() => {
//         res.status(200).json("Site created");
//       });
//     }
// }


// pages/api/categories/index.js
import { allCategoriesQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(req, res) {
  const query = allCategoriesQuery();

  try {
    const categories = await client.fetch(query);
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}