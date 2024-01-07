import { PrismaClient } from "@prisma/client";
import { userExists } from "../services/userServices.js";
import jwt from "jsonwebtoken";

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
      const token = jwt.sign({ username: name }, process.env.SECRET);
      return res.status(201).json({ msg: `User created with id: ${user.id} Token: ${token}` });
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
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ error: "Invalid Authorization header format" });
    }

    const verified_Token = jwt.verify(token, process.env.SECRET);
    if (verified_Token) {
      const name = jwt.decode(token);
      return res.status(201).json({ msg: `userName: ${name.username}` });
    } else {
      return res.status(401).json({ error: "Invalid Token" });
    }
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
}