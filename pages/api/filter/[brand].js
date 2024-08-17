import { brandPostsQuery } from "./../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { brand } = req.query;

    const sitesQuery = brandPostsQuery(brand);

    const sites = await client.fetch(sitesQuery);

    res.status(200).json(sites);
  }
}
