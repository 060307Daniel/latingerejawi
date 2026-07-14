import { prisma } from "./src/lib/prisma";

async function main() {

    const tables = await prisma.$queryRawUnsafe(`
SELECT 
(SELECT COUNT(*) FROM User) AS users,
(SELECT COUNT(*) FROM UserProgress) AS progress,
(SELECT COUNT(*) FROM ChatRoom) AS rooms,
(SELECT COUNT(*) FROM Message) AS messages,
(SELECT COUNT(*) FROM CertificateConfig) AS configs;
`);

console.log(tables);
  const info = await prisma.$queryRawUnsafe(`
    SELECT 
      DATABASE() as db,
      @@hostname as host,
      @@port as port
  `);

  console.log(info);

  const users = await prisma.$queryRawUnsafe(`
    SELECT id, name, email 
    FROM \`User\`
    LIMIT 5
  `);

  console.log(users);

  const count = await prisma.$queryRawUnsafe(`
    SELECT COUNT(*) as total 
    FROM \`User\`
  `);

  console.log(count);
}


main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());