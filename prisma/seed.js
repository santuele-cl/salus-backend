import prismaInstance from "./prismaClient.js";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 8);

const main = async () => {
  // const defaultConfig = await prismaInstance.configuration.create({
  //   data: {
  //     id: "C58923F",
  //     name: "Salus",
  //     logo: "",
  //     loginBg: "",
  //   },
  // });

  const config = await prismaInstance.configuration.create({
    data: {
      id: "C58923F",
      name: "Taguig-Pateros District Hospital",
      logo: "https://pixlok.com/wp-content/uploads/2021/12/Hospital-Icon-98gbn.png",
      loginBg:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });

  const roles = await prismaInstance.role.createMany({
    data: [
      { id: "R1001", roleName: "ADMIN" },
      { id: "R1002", roleName: "PHYSICIAN" },
      { id: "R1003", roleName: "NURSE" },
    ],
  });

  const serviceDepartments = await prismaInstance.serviceDepartment.createMany({
    data: [
      {
        id: "SD1001",
        serviceDeptName: "Emergency Department",
        serviceDeptHead: "Timoteo Neil Trinida, MD",
      },
      {
        id: "SD1002",
        serviceDeptName: "Admitting Section",
        serviceDeptHead: "Karen Glumalid",
      },
      {
        id: "SD1003",
        serviceDeptName: "Outpatient Department",
        serviceDeptHead: "Pascual Pattaui, MD",
      },
    ],
  });

  const catchlinicalDepartments =
    await prismaInstance.clinicalDepartment.createMany({
      data: [
        {
          id: "CD2001",
          clinicalDeptName: "Surgical Sciences",
          clinicalDeptHead: "Timoteo Neil Trinida, MD",
        },
        {
          id: "CD2002",
          clinicalDeptName: "Ob-Gyne",
          clinicalDeptHead: "Natividad Go-Anat, MD",
        },
        {
          id: "CD2003",
          clinicalDeptName: "Pedia",
          clinicalDeptHead: "Ma. Rima Apelo, MD",
        },
        {
          id: "CD2004",
          clinicalDeptName: "Internal Medicine",
          clinicalDeptHead: "Angeli Del Valle, MD",
        },
        {
          id: "CD2005",
          clinicalDeptName: "Emergency Medicine",
          clinicalDeptHead: "Mark Jeffrey Onato, MD",
        },
        {
          id: "CD2006",
          clinicalDeptName: "Dental",
          clinicalDeptHead: "Florabel Mabborang, DMD",
        },
        {
          id: "CD2007",
          clinicalDeptName: "Anesthesia",
          clinicalDeptHead: "Guillen Segador, MD",
        },
      ],
    });

  const clyde = await prismaInstance.user.upsert({
    where: { id: "UA7CF4967" },
    update: {},
    create: {
      id: `UA7CF4967`,
      username: "clyde",
      password: await bcrypt.hash("password123", 10),
      role: { connect: { id: "R1001" } },
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

  const ara = await prismaInstance.user.upsert({
    where: { id: "UJFJ802JQ" },
    update: {},
    create: {
      id: `UJFJ802JQ`,
      username: "ara",
      password: await bcrypt.hash("password123", 10),
      role: { connect: { id: "R1002" } },
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
      role: { connect: { id: "R1003" } },
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

  const patient = await prismaInstance.patient.create({
    data: {
      id: "PKL90DKALD2",
      patientChart: { create: { id: "PPC38DA208FBA" } },
      patientProfile: {
        create: {
          id: "PPLL9K0A23KH",
          fname: "Juan",
          mname: "Batum",
          lname: "Dela Cruz",
          age: 20,
          gender: "male",
          bdate: "2024-12-27T10:48:22Z",
          bplace: "makati",
          civilStatus: "SINGLE",
          occupation: "n/a",
          contactNumber: "09561379564",
          email: "juan.delacruz@gmail.com",
          address: "BLK 28 L 1 Maya Street, Brgy. Rizal, Makati",
          isSmoking: false,
          isCovidVaccinated: false,
          isDengvaxiaVaccinated: false,
        },
      },
    },
  });

  const visit = await prismaInstance.visit.create({
    data: {
      id: "V574C24726E4E3E607",
      patientChart: { connect: { id: "PPC38DA208FBA" } },
      accompaniedBy: "Angela",
      chiefComplaint: "Ear Pain",
      hpi: "Pain started 3 days. Worse 1 day ago. Now severe.",
      serviceDepartment: { connect: { id: "SD1001" } },
      evaluation: {
        create: {
          id: "EV4FFFB323AFBA26B2",
          physician: { connect: { id: "UJFJ802JQ" } },
          physicalExamination: "test",
          diagnosis: "Otitis Media",
          treatment: "",
          prescription: "Co-amoxiclav 3x a day for 7 days.",
        },
      },
      vitals: {
        create: {
          id: "VITALS1",
          nurse: { connect: { id: "UZOPWLJ29" } },
          heightInCm: 160,
          weightInKl: 55,
          bpSystolic: 120,
          bpDiastolic: 80,
          pulseRate: 75,
          respiratoryRate: 15,
          bodyTempInCelsius: 36,
          oxygenSaturation: 95,
        },
      },
    },
  });
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
