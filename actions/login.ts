"use server";

import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // If user does not exist, create new user
      const newUser = await db.user.create({
        data: {
          name: name,
          email: email,
          password: password, // Note: Remember to hash passwords before storing
        },
      });

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
