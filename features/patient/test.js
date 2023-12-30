import prismaInstance from "../../prisma/prismaClient.js";

const test = async () => {
  try {
    await prismaInstance.visit.create({
      data: {
        id: "V001",
        patientChart: { connect: { id: "PPC38DA208FBA" } },
        accompaniedBy: "Clyde",
        chiefComplaint: "Tooth ache",
        hpi: "Test HPI",
        serviceDepartment: { connect: { id: "SD1001" } },
        evaluation: {
          create: {
            id: "EVAL1",
            physician: { connect: { id: "U99B3B013" } },
            physicalExamination: "test",
            diagnosis: "test",
            treatment: "test",
            prescription: "test",
          },
        },
        vitals: {
          create: {
            id: "VITALS1",
            nurse: { connect: { id: "UZOPWLJ29" } },
            heightInCm: 160,
            weightInKl: 50,
            bloodPressure: 100,
            pulseRate: "100",
            respiratoryRate: "100",
            bodyTemperatureInCelsius: 50,
            oxygenSaturation: "20",
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

test();
/**
 * const test = async () => {
  try {
    await prismaInstance.patientChart.create({
      where: { id: "PP3CDC9B7BAD" },
      data: {
        patientChart: {
          create: {
            visits: {
              create: {
                id: "VISIT1",
                accompaniedBy: "Clyde",
                chiefComplaint: "Tooth ache",
                hpi: "Test HPI",
                serviceDepartment: { connect: { id: "SD1001" } },
                evaluation: {
                  create: {
                    id: "EVAL1",
                    physician: { connect: { id: "U99B3B013" } },
                    physicalExamination: "test",
                    diagnosis: "test",
                    treatment: "test",
                    prescription: "test",
                  },
                },
                vitals: {
                  create: {
                    id: "VITALS1",
                    nurse: { connect: { id: "UZOPWLJ29" } },
                    heightInCm: 160,
                    weightInKl: 50,
                    bloodPressure: 100,
                    pulseRate: "100",
                    respiratoryRate: "100",
                    bodyTemperatureInCelsius: 50,
                    oxygenSaturation: "20",
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
 */
// const required = [
//   "fname",
//   "mname",
//   "lname",
//   "age",
//   "gender",
//   "bdate",
//   "bplace",
//   "civilStatus",
//   "occupation",
//   "contactNumber",
//   "email",
//   "address",
//   "isSmoking",
//   "isCovidVaccinated",
//   "isDengvaxiaVaccinated",
// ];

// const profile = {
//   fname: "fd",
//   mname: "fd",
//   lname: "fd",
//   age: "fd",
//   gender: "fd",
//   bdate: "fd",
//   bplace: "fd",
//   civilStatus: "fd",
//   occupation: "fd",
//   contactNumber: "fd",
//   email: "fd",
//   address: "fd",
//   isSmoking: "fd",
//   isCovidVaccinated: "fd",
//   isDengvaxiaVaccinated: "fd",
// };

// const missingField = [];
// const validateInput = required.map((field) => {
//   if (Object.hasOwn(profile, field)) {
//     return true;
//   } else {
//     missingField.push(field);
//     return false;
//   }
// });

// const isInputValid = validateInput.every((bool) => bool === true);

// console.log(validateInput);
// console.log(isInputValid);
// console.log(missingField);
// console.log(`The following field is missing [ ${missingField.join(" , ")} ].`);
