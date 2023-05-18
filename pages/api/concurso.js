// Next.js API route at /pages/api/concurso.js

import prisma from '@component/lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { challenge, platform, username } = req.body;

    // Input validation
    if (!challenge || !platform || !username) {
      return res
        .status(400)
        .json({ msg: 'Por favor completa todos los campos' });
    }

    const pattern = /^@[a-zA-Z0-9_.-]*$/;
    if (!pattern.test(username)) {
      return res
        .status(400)
        .json({ msg: 'El formato de usuario debe ser @nombredeusuario' });
    }

    // Store the data in your Prisma database
    try {
      const newChallenge = await prisma.concursoChallenge.create({
        data: { challenge, platform, username },
      });

      res.status(201).json(newChallenge);
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (req.method === 'DELETE') {
    try {
      const deleteAll = await prisma.concursoChallenge.deleteMany();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to delete challenges' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
