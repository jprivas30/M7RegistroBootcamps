const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;

// CREAR BOOTCAMP
exports.createBootcamp = (bootcamp) => {
  return Bootcamp.create({
    title: bootcamp.title,
    cue: bootcamp.cue,
    description: bootcamp.description,
  })
    .then((bootcamp) => {
      console.log(
        `Se ha creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`
      );
      return bootcamp;
    })
    .catch((err) => {
      console.log(`Error al crear el bootcamp ${err}`);
    });
};

// AÑADIR USUARIO A BOOTCAMP
exports.addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("No se encontro el bootcamp!");
        return null;
      }

      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("Usuario no encontrado!");
          return null;
        }

        bootcamp.addUser(user);
        console.log(
          `Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`
        );
        return bootcamp;
      });
    })
    .catch((err) => {
      console.log(
        "Error mientras se estaba agregando Usuario al Bootcamp",
        err
      );
    });
};

//BUSCAR BOOTCAMPS POR ID
exports.findById = (Id) => {
  return Bootcamp.findByPk(Id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamp) => {
      return bootcamp;
    })
    .catch((err) => {
      console.log(`Error mientras se encontraba el bootcamp:
  ${err}`);
    });
};

//OBTENER TODOS LOS BOOTCAMPS CON SUS USUARIOS
exports.findAll = () => {
  return Bootcamp.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: { attributes: [] },
      },
    ],
  })
    .then((bootcamps) => {
      return bootcamps;
    })
    .catch((err) => {
      console.log("Error Buscando los proyectos: ", err);
    });
};
