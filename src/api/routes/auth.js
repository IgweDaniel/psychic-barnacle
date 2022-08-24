import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
import UserService from "@/services/users";

import { body, param, validationResult } from "express-validator";

const route = Router();

export default (appRouter) => {
  appRouter.use("/auth", route);

  route.post(
    "/",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //   token is created here
      const user = await UserService.validateCredentials();
      if (!user) {
        return res.status(400).json({ msg: "invalid credentials" });
      }

      // handle auth

      return res.json({ msg: "Account Registered" }).status(200);
    }
  );

  route.get(
    "/verify/:verifyToken",
    param("verifyToken").isMongoId(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "invalid token" });
      }

      console.log(req.params);
    }
  );

  route.post("/verify/", body("email").isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Account not found" });
    }

    console.log(req.params);
  });
};
