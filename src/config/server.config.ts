export default {
  SERVER_PORT: 9000,
  ENVIROMENT: "DEV",
  DATABASE: {
    DEV: {
      URI: "",
      PARAMS: {},
    },
    PROD: {
      URI: "",
      PARAMS: {},
    },
  },
  application: {
    cors: {
      server: [
        {
          origin: "*", //servidor que deseas "localhost:3000" que consuma o (*) en caso que sea acceso libre
          credentials: true,
        },
      ],
    },
    responseHeaders: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      Allow: "GET, POST, OPTIONS, PUT, DELETE",
    },
    BASE_URL: "/api",
  },
};
