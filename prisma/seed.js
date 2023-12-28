import prismaInstance from "./prismaClient.js";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 8);

const main = async () => {
  const clyde = await prismaInstance.user.upsert({
    where: { id: "UA7CF4967" },
    update: {},
    create: {
      id: `UA7CF4967`,
      username: "clyde",
      password: await bcrypt.hash("password123", 10),
      role: { create: { id: "R1001", roleName: "ADMIN" } },
      userProfile: {
        create: {
          id: `UA7CF4967`,
          fname: "Lenon",
          mname: "Arr",
          lname: "San",
          bdate: "2023-12-27T10:48:22Z",
          contactNumber: "09358295738",
          email: "clyde.admin@email.com",
          address: "south",
        },
      },
    },
  });
  {
    const ara = await prismaInstance.user.upsert({
      where: { id: "UJFJ802JQ" },
      update: {},
      create: {
        id: `UJFJ802JQ`,
        username: "ara",
        password: await bcrypt.hash("password123", 10),
        role: { create: { id: "R1002", roleName: "PHYSICIAN" } },
        userProfile: {
          create: {
            id: `UJFJ802JQ`,
            fname: "Ara",
            mname: "Zir",
            lname: "Buenaventura",
            bdate: "2023-12-27T10:48:22Z",
            contactNumber: "09455833435",
            email: "ara.physician@email.com",
            address: "comembo",
          },
        },
      },
    });
    const princess = await prismaInstance.user.upsert({
      where: { id: "UZOPWLJ29" },
      update: {},
      create: {
        id: `UZOPWLJ29`,
        username: "princess",
        password: await bcrypt.hash("password123", 10),
        role: { create: { id: "R1003", roleName: "NURSE" } },
        userProfile: {
          create: {
            id: `UZOPWLJ29`,
            fname: "Princess",
            mname: "Rich",
            lname: "Funa",
            bdate: "2023-12-27T10:48:22Z",
            contactNumber: "09985553434",
            email: "princess.nurse@email.com",
            address: "central",
          },
        },
      },
    });
  }
};

main()
  .then(async () => {
    await prismaInstance.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaInstance.$disconnect();
    process.exit(1);
  });
