require("dotenv").config();

const Hapi = require("@hapi/hapi");
const notes = require("./api/notes");
const NoteServices = require("./services/postgres/NoteService");
const NotesValidator = require("./validator/notes");

const init = async () => {
  const noteServices = new NoteServices();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: noteServices,
      validator: NotesValidator,
    },
  });

  await server.start();

  console.log(
    `server running in ${process.env.NODE_ENV} mode on ${server.info.uri}`
  );
};

init();
