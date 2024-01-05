import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();

async function createUser(name, email) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return user;
}

app.use(express.json());

app.post('/signup', (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }

    const user = createUser(name, email);

    res.status(201).json({ msg: `User data : ${JSON.stringify(user)}` });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
