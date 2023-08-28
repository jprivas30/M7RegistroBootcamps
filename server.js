const db = require("./app/models");
const userController = require("./app/controllers/user.controller");
const bootcampController = require("./app/controllers/bootcamp.controller");

const run = async () => {
  // CREACIÓN DE USUARIOS
  const user1 = await userController.createUser({
    firstName: "Mateo",
    lastName: "Díaz",
    email: "mateo.diaz@correo.com",
  });
  const user2 = await userController.createUser({
    firstName: "Santiago",
    lastName: "Mejias",
    email: "santiago.mejias@correo.com",
  });
  const user3 = await userController.createUser({
    firstName: "Lucas",
    lastName: "Rojas",
    email: "lucas.rojas@correo.com",
  });
  const user4 = await userController.createUser({
    firstName: "Facundo",
    lastName: "Fernandez",
    email: "facundo.fernandez@correo.com",
  });

  // CREACIÓN DE BOOTCAMPS

  const bootcamp1 = await bootcampController.createBootcamp({
    title: "Introduciendo El Bootcamp De React.",
    cue: 10,
    description:
      "React es la librería más usada en JavaScript para el desarrollo de interfaces.",
  });
  const bootcamp2 = await bootcampController.createBootcamp({
    title: "Bootcamp Desarrollo Web Full Stack.",
    cue: 8,
    description:
      "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.",
  });
  const bootcamp3 = await bootcampController.createBootcamp({
    title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.",
    cue: 9,
    description:
      "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.",
  });


  // AÑADIR USERS A BOOTCAMPS
  await bootcampController.addUser(1, 1);
  await bootcampController.addUser(1, 2);
  await bootcampController.addUser(2, 1);
  await bootcampController.addUser(3, 1);
  await bootcampController.addUser(3, 2);
  await bootcampController.addUser(3, 3);

  // BUSCAR BOOTCAMP POR ID
  const datosBootcampUno = await bootcampController.findById(bootcamp1.id);
  console.log("Bootcamp ", JSON.stringify(datosBootcampUno, null, 2));

  //BUSCAR TODOS LOS BOOTCAMPS CON SUS USUARIOS REGISTRADOS
  const allBootcamps = await bootcampController.findAll();
  console.log("bootcamps: ", JSON.stringify(allBootcamps, null, 2));

  //BUSCAR BOOTCAMPS DE UN USUARIO
  const userOneBootcamps = await userController.findUserById(user1.id);
  console.log("usuario: ", JSON.stringify(userOneBootcamps, null, 2));

  //BUSCAR TODOS LOS USUARIOS CON SUS BOOTCAMPS
  const userList = await userController.findAll();
  console.log("usuarios: ", JSON.stringify(userList, null, 2));

  //REALIZAR CAMBIOS A USUARIO
  await userController.updateUserById(
    1,
    "Pedro",
    "Sánchez",
    "pedro.sanchez@test.com"
  );

  const userOneCheck = await userController.findUserById(user1.id);
  console.log("usuario: ", JSON.stringify(userOneCheck, null, 2));

  await userController.deleteUserById(1);
  const deleteCheck = await userController.findUserById(user1.id);
  console.log("usuario: ", JSON.stringify(deleteCheck, null, 2));
};

db.sequelize.sync({
    force: true,
  })
  .then(() => {
    console.log("Eliminando y resincronizando la base de datos.");
    run();
  });
