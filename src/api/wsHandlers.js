export default (wss) => {
  wss.on("connection", function connection(ws, request, client) {
    ws.on("message", function message(data) {
      console.log(`Received message ${data} from user ${client}`);
    });
  });
};
