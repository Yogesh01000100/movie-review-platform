import { PrismaClient } from "@prisma/client";
import { userExists } from "../services/userServices.js"

const prisma = new PrismaClient();

export async function signup(req, res) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Username and email are required!" });
    }
    const userStatus = await userExists(email);
    if (!userStatus) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      return res.status(201).json({ msg: `User created with id: ${user.id}` });
    } else {
      return res.status(409).json({ msg: "User Already Exists!" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    // Add login functionality here
  } catch (error) {
    // Handle login error here
  }
}
