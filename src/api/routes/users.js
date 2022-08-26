import { Router } from "express";
// import middlewares from "../middlewares";
import { UserService } from "@/services";

import { body, validationResult } from "express-validator";

const route = Router();

export default (appRouter) => {
  appRouter.use("/users", route);

  route.post(
    "/",
    body("email").isEmail(),
    body("username").isString(),
    body("password").isLength({ min: 5 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password, username } = req.body;

      await UserService.createProfile(email, password, username);

      return res.json({ msg: "Account Registered" }).status(200);
    }
  );
};
