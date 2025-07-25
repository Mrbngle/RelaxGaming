
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // Use a strong secret in production

// For initial setup: create a default admin user if none exists
export const createDefaultAdmin = async () => {
  const adminExists = await prisma.user.findUnique({ where: { username: 'admin' } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('adminpassword', 10); // Use a strong password
    await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
      },
    });
    console.log('Default admin user created: admin/adminpassword');
  }
};

export const loginUser = async (username: string, passwordInput: string) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(passwordInput, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  return { token };
};
