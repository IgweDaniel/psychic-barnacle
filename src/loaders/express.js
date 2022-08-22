import express from "express";
import cors from "cors";
import routes from "@/api";
import config from "@/config";

export default () => {
  const app = express();
  app.use(cors());

  app.use(express.json());
  // Load API routes
  app.use(config.api.prefix, routes());
  return app;
};
