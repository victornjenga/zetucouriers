import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "./../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const query = singleUserQuery(id);
    const userSitesQuery = userCreatedPostsQuery(id);
    const userLikedSitesQuery = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userSites = await client.fetch(userSitesQuery);
    const userLikedSites = await client.fetch(userLikedSitesQuery);

    const data = { user: user[0], userSites, userLikedSites };

    res.status(200).json(data);
  }
}
