import { searchPostsQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const sitesQuery = searchPostsQuery(id);

    const sites = await client.fetch(sitesQuery);

    res.status(200).json(sites);
  }
}
