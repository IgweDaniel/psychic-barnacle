const request = require("supertest");
import loaders from "@/loaders";
import config from "@/config";

let app;
const apiRoot = `${config.api.prefix}/users`;
beforeAll(async () => {
  [app] = await loaders({ dbUri: globalThis.testDBUri });
});

test("POST /users 400 ", async () => {
  const { status, body } = await request(app).post(apiRoot).send({
    name: "daniel",
    email: "d@ad.com",
  });

  expect(status).toBe(400);
});

// test("POST /users 409 ", async () => {
//   const { status, body } = await request(app()).post(apiRoot).send({
//     name: user.name,
//     email: user.email,
//     password: "123456",
//   });
//   expect(body.data).toBeNull();
//   expect(body.error).toBeTruthy();
//   expect(status).toBe(409);
// });

// test("GET /user 200 ", async () => {
//   const { status, body } = await request(app())
//     .get(`${apiRoot}/me`)
//     .set("Authorization", `Bearer ${token}`);

//   expect(body.data).toHaveProperty("user");
//   expect(body.error).toBeNull();
//   expect(status).toBe(200);
// });
