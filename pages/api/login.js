import { client } from "../../utils/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handleUserAuth(req, res) {
  if (req.method === "POST") {
    const { email, password, name, type, sub, picture, role } = req.body; // Added role for vendor/customer distinction

    try {
      // Ensure JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return res.status(500).json({ error: "Server configuration error" });
      }

      if (type === "google") {
        // Google OAuth login logic for customers and vendors
        const doc = {
          _type: "user",
          _id: sub,
          name,
          email,
          picture,
          role: role || "customer", // Default to customer if no role is specified
        };

        await client.createOrReplace(doc);

        const token = jwt.sign(
          { _id: sub, email, role: role || "customer" }, // Include default role in the token
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "Google login successful",
          user: doc,
          token,
        });
      } else if (type === "email") {
        // Email/password login for customers and vendors

        // Default role to "customer" if not provided
        const userRole = role || "customer";

        // Query to find user by email and role
        const query = `*[_type == "user" && email == $email && role == $role][0]`;
        const existingUser = await client.fetch(query, {
          email,
          role: userRole,
        });

        if (!existingUser) {
          return res.status(401).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!validPassword) {
          return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
          {
            _id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "Login successful",
          user: existingUser,
          token,
        });
      } else if (type === "register") {
        // Registration logic for customers and vendors

        // Default role to "customer" if not provided
        const userRole = role || "customer";

        const query = `*[_type == "user" && email == $email][0]`;
        const existingUser = await client.fetch(query, { email });

        if (existingUser) {
          return res.status(400).json({ error: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          _type: "user",
          email,
          name,
          password: hashedPassword,
          role: userRole, // Ensure role is set
        };

        const createdUser = await client.create(newUser);
        return res.status(200).json({
          message: "User registered successfully",
          user: createdUser,
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
