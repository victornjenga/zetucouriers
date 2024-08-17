import { categoryPostsQuery } from "./../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { category } = req.query;

    const sitesQuery = categoryPostsQuery(category);

    const sites = await client.fetch(sitesQuery);

    res.status(200).json(sites);
  }
}
