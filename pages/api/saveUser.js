// import { sanityClient } from "../../utils/client";
import { client } from "../../utils/client";

export default async function saveUser(req, res) {
  if (req.method === "POST") {
    const { sub, name, email, picture } = req.body;

    try {
      const doc = {
        _type: "user",
        _id: sub, // Use Google user ID as the document ID to avoid duplicates
        name,
        email,
        picture,
      };

      await client.createOrReplace(doc);
      res.status(200).json({ message: "User saved successfully" });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Failed to save user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
