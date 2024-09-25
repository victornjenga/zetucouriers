import { client } from "../../utils/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handleUserAuth(req, res) {
  if (req.method === "POST") {
    const { email, password, name, type, sub, picture } = req.body; // include sub and picture for Google login

    try {
      // Ensure the JWT secret is defined
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return res.status(500).json({ error: "Server configuration error" });
      }

      if (type === "google") {
        // Google OAuth login logic
        const doc = {
          _type: "user",
          _id: sub, // Use Google user ID as the document ID to avoid duplicates
          name,
          email,
          picture,
        };

        // Save user to Sanity
        await client.createOrReplace(doc);

        const token = jwt.sign(
          { _id: sub, email }, // Use sub as user ID
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "Google login successful",
          user: doc,
          token,
        });
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

        try {
          const createdUser = await client.create(newUser);
          return res.status(200).json({
            message: "User registered successfully",
            user: createdUser, // Return the created user
          });
        } catch (error) {
          console.error("Error creating new user:", error); // Log the error
          return res.status(500).json({ error: "Failed to create user" });
        }
      }
    } catch (error) {
      console.error("Error handling auth:", error);
      return res.status(500).json({ error: "Failed to handle authentication" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
