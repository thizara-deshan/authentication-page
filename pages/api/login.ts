"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db"; // Assuming you have a prisma.js file to initialize the client

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await db.user.findUnique({
      where: { email, password },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    if (!user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
