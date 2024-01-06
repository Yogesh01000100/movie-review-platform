import { createUser } from '../services/userServices.js';

export async function signup(req, res) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }

    const user = await createUser(name, email);
    console.log(user)

    res.status(201).json({ msg: `User created with id: ${user.id}` })
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}