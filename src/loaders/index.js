import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import wsLoader from "./ws";

async function init() {
  await mongooseLoader();
  return [expressLoader(), wsLoader()];
}

export default init;
