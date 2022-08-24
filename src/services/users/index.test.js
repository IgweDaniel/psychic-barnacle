import { UserService } from "../";

test("creates user profile", async () => {
  const profile = await UserService.createProfile({
    email: "daniel",
    username: "chiboy",
  });

  expect(profile).toBe(4);
});

//   test("fails to creates existing profile", async () => {
//     const profile = await UserService.createProfile({
//       email: "daniel",
//       username: "chiboy",
//     });

//     expect(profile).toBe(4);
//   });
