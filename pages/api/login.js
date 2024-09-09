import { client } from "../../utils/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handleUserAuth(req, res) {
  if (req.method === "POST") {
    const { email, password, name, type } = req.body;

    try {
      // Ensure the JWT secret is defined
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return res.status(500).json({ error: "Server configuration error" });
      }

      if (type === "google") {
        // Google OAuth login logic (same as before)
      } else if (type === "email") {
        // Email/password login logic
        const query = `*[_type == "user" && email == $email][0]`;
        const existingUser = await client.fetch(query, { email });

        if (!existingUser) {
          return res.status(401).json({ error: "User not found" });
        }

        if (!existingUser.password) {
          return res
            .status(500)
            .json({ error: "Password is missing in the database" });
        }

        const validPassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!validPassword) {
          return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
          { _id: existingUser._id, email: existingUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "Login successful",
          user: existingUser,
          token,
        });
      } else if (type === "register") {
        // Registration logic
        const query = `*[_type == "user" && email == $email][0]`;
        const existingUser = await client.fetch(query, { email });

        if (existingUser) {
          // If the user already exists, return an appropriate error message
          return res.status(400).json({ error: "User already registered" });
        }

        // Hash the password and create the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          _type: "user",
          email,
          name,
          password: hashedPassword, // Save hashed password
        };

        await client.create(newUser);

        return res.status(200).json({
          message: "User registered successfully",
          user: newUser,
        });
      }
    } catch (error) {
      console.error("Error handling auth:", error);
      return res.status(500).json({ error: "Failed to handle authentication" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
