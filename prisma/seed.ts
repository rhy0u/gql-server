import { PrismaClient } from "@prisma/client"
import { littleLorem, lorem } from "./seedData"

const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { userName: "alice" },
    update: {},
    create: {
      userName: "alice",
      posts: {
        create: {
          title: "Check out Prisma with Next.js",
          content: lorem,
          comments: {
            create: [{ content: littleLorem }],
          },
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { userName: "bob" },
    update: {},
    create: {
      userName: "bob",
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            content: lorem,
            comments: {
              create: [{ content: littleLorem }, { content: littleLorem }],
            },
          },
          {
            title: "Follow Nexus on Twitter",
            content: lorem,
            comments: {
              create: [{ content: littleLorem }, { content: littleLorem }],
            },
          },
        ],
      },
    },
  })
  const jack = await prisma.user.upsert({
    where: { userName: "jack" },
    update: {},
    create: {
      userName: "jack",
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            content: lorem,
            comments: {
              create: [{ content: littleLorem }, { content: littleLorem }],
            },
          },
          {
            title: "Follow Nexus on Twitter",
            content: lorem,
            comments: {
              create: [{ content: littleLorem }, { content: littleLorem }],
            },
          },
        ],
      },
    },
  })
  console.log({ alice, bob, jack })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
