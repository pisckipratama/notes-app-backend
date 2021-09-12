require("dotenv").config();

const Hapi = require("@hapi/hapi");

// notes
const notes = require("./api/notes");
const NoteServices = require("./services/postgres/NoteService");
const NotesValidator = require("./validator/notes");

// users
const users = require("./api/users");
const UsersService = require("./services/postgres/UsersService");
const UserValidator = require("./validator/users");

const init = async () => {
  const noteServices = new NoteServices();
  const userServices = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: noteServices,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: userServices,
        validator: UserValidator,
      },
    },
  ]);

  await server.start();

  console.log(
    `server running in ${process.env.NODE_ENV} mode on ${server.info.uri}`
  );
};

init();
