import { WebSocketServer } from "ws";
import wsHandlers from "@/api/wsHandlers";

export default () => {
  const wss = new WebSocketServer({ noServer: true });
  wsHandlers(wss);
  return wss;
};
