
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create a default admin user if none exists
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
