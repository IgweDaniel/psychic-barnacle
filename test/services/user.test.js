import { UserService } from "@/services";
import UserModel from "@/models/user";
import { Types } from "mongoose";
import { ERRORS } from "@/constants";
let testUser;
beforeEach(async () => {
  testUser = await UserModel.create({
    email: "test_email@mail.com",
    password: "test_password",
    username: "test_username",
  });
});

describe("profile Creation", () => {
  test("creates user profile in db", async () => {
    const deets = {
      email: "daniel@gmail.com",
      username: "chiboy",
      password: "12345",
    };
    await UserService.createProfile(deets);

    const user = await UserModel.findOne({ username: deets.username });
    expect(deets.email).toBe(user.email);
    expect(deets.username).toBe(user.username);
  });

  test("creates and returns user profile", async () => {
    const deets = {
      email: "daniel@gmail.com",
      username: "chiboy",
      password: "12345",
    };
    const profile = await UserService.createProfile(deets);

    expect(deets.email).toBe(profile.email);
    expect(Types.ObjectId.isValid(profile.id)).toBeTruthy();
  });

  test("throws error for invalid arguments", async () => {
    const deets = {
      email: "daniel@gmail.com",
      username: "chiboy",
    };
    try {
      await UserService.createProfile(deets);
    } catch (error) {
      const user = await UserModel.findOne({ username: deets.username });
      expect(user).toBeNull();
      expect(error.message).toBe(ERRORS.BAD_ARGS);
    }
  });

  test("throws error for duplicate user details", async () => {
    const deets = {
      email: "daniel@gmail.com",
      username: "chiboy",
      password: "12345",
    };
    try {
      await UserService.createProfile(deets);
      await UserService.createProfile(deets);
    } catch (error) {
      expect(error.message).toBe(ERRORS.DUPLICATE);
    }
  });
});

describe("single users Fetching", () => {
  test("returns user profile with valid id, username, email in db", async () => {
    let user = await UserService.getUserProfile({ email: testUser.email });
    expect(user).toBeTruthy();
    expect(testUser.email).toBe(user.email);

    user = await UserService.getUserProfile({ username: testUser.username });
    expect(user).toBeTruthy();
    expect(testUser.username).toBe(testUser.username);

    user = await UserService.getUserProfile({ id: testUser.id });
    expect(user).toBeTruthy();
    expect(testUser.username).toBe(testUser.username);

    user = await UserService.getUserProfile({
      id: testUser.id,
      username: testUser.username,
      email: testUser.email,
    });
    expect(user).toBeTruthy();
    expect(testUser.username).toBe(testUser.username);
    expect(testUser.email).toBe(testUser.email);
    expect(testUser.id).toBe(testUser.id);
  });
  test("returns null with invalid user deets", async () => {
    const user = await UserService.getUserProfile({
      id: "nonexistentId",
      email: "nonexistentemail",
    });
    expect(user).toBeNull();
  });
});

// describe("", () => {
//   test("returns user profile with valid id, username, email in db", async () => {
//     let user = await UserService.getUserProfile({ email: testUser.email });
//     expect(user).toBeTruthy();
//     expect(testUser.email).toBe(user.email);
//   });
// });
