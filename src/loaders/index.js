import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import wsLoader from "./ws";

async function init(ctx) {
  await mongooseLoader(ctx.dbUri);
  return [expressLoader(), wsLoader()];
}

export default init;
