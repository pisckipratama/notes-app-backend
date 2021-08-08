const Hapi = require("@hapi/hapi");
const notes = require("./api/notes");
const NoteServices = require("./services/InMemory/noteServices");

const init = async () => {
  const noteServices = new NoteServices();

  const server = Hapi.server({
    port: 5000,
    host: `${process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"}`,
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
    },
  });

  await server.start();

  console.log(
    `server running in ${process.env.NODE_ENV} mode on ${server.info.uri}`
  );
};

init();
