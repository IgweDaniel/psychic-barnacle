import loaders from "./loaders";
import config from "@/config";
import http from "http";
import session from "express-session";
import MongoStore from "connect-mongo";

/**
 * Remove Later #####
 */
import { MongoMemoryServer } from "mongodb-memory-server";
const mongod = await MongoMemoryServer.create();
const uri = mongod.getUri();
config.databaseURL = uri;
// #####

const sessionParser = session({
  secret: config.api.secret,
  store: MongoStore.create({ mongoUrl: config.databaseURL }),
  resave: false,
  saveUninitialized: false,
});

(async function () {
  const [app, wss] = await loaders({
    dbUri: config.databaseURL,
    sessionStore: null,
  });
  app.use(sessionParser);

  const server = http.createServer(app);

  server.on("upgrade", function (request, socket, head) {
    console.log("Parsing session from request...");

    sessionParser(request, {}, () => {
      if (!request.session.userId) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }

      console.log("Session is parsed!");

      wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit("connection", ws, request);
      });
    });
  });

  server
    .listen(config.port, () => {
      console.info(`
      ################################################
      🛡️  Server listening on port: http://localhost:${config.port}/api 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
})();
