import { PrismaClient, Prisma } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();
const date = new Date('2021-05-27');

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: 'password',
    registeredAt: date,
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
          publishedAt: date
        }
      ]
    }
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: 'password',
    registeredAt: date,
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
          publishedAt: date
        }
      ]
    }
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: 'password',
    registeredAt: date,
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
          publishedAt: date
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
          publishedAt: date
        }
      ]
    }
  }
];

async function main() {
  console.log(`Start seeding ...`);
  const password = await argon2.hash('12345678');
  for (const u of userData) {
    u.password = password;
    const user = await prisma.user.create({
      data: u
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
