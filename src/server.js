const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: `${process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'}`,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();

  console.log(`server running in ${process.env.NODE_ENV} mode on ${server.info.uri}`);
};

init();
