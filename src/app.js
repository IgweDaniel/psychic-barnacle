import loaders from "./loaders";
import config from "@/config";
import http from "http";

(async function () {
  const [app, wss] = await loaders();

  const server = http.createServer(app);

  server.on("upgrade", function upgrade(request, socket, head) {
    // This function is not defined on purpose. Implement it with your own logic.
    authenticate(request, function next(err, client) {
      if (err || !client) {
        socket.write("HTTP/1.1 401 Unauthor ized\r\n\r\n");
        socket.destroy();
        return;
      }

      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit("connection", ws, request, client);
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
