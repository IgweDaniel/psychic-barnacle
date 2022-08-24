import { Router } from "express";
import auth from "./routes/auth";
import user from "./routes/users";

export default () => {
  const router = Router();
  auth(router);
  user(router);

  return router;
};
