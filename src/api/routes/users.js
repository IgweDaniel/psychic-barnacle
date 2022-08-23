import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
import UserService from "@/services/users";
import UserModel, { schema } from "@/models/user";
const route = Router();

export default (appRouter) => {
  appRouter.use("/users", route);

  route.get("/me", (req, res) => {
    return res.json({ msg: "Hello from the other side" }).status(200);
  });
  route.post("/test", (req, res) => {
    return res.json({ msg: "success" }).status(200);
  });
  // route.post("/test", body(schema), (req, res) => {

  //   return res.json({ msg: "success" }).status(200);
  // });
};
