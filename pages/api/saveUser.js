import { client } from "../../utils/client";

export default async function saveUser(req, res) {
  if (req.method === "POST") {
    const { sub, name, email, picture, role } = req.body;

    try {
      // Default role to customer if not provided
      const userRole = role || "customer";

      const doc = {
        _type: "user",
        _id: sub, // Use Google user ID as the document ID to avoid duplicates
        name,
        email,
        picture,
        role: userRole, // Assign the user role (admin, customer, vendor)
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
