import { UserService } from "@/services";
import UserModel from "@/models/user";
import { Types } from "mongoose";
import { ERRORS } from "@/constants";
let testUser;

beforeEach(async () => {
  testUser = await UserModel.create({
    email: "test_email@mail.com",
    username: "test_username",
    password: "test_password",
  });
});

describe("profile Creation", () => {
  test("creates user profile in db", async () => {
    const creds = {
      email: "daniel@gmail.com",
      username: "chiboy",
      password: "12345",
    };
    await UserService.createProfile(creds);

    const user = await UserModel.findOne({ username: creds.username });
    expect(creds.email).toBe(user.email);
    expect(creds.username).toBe(user.username);
  });

  test("creates and returns user profile", async () => {
    const creds = {
      email: "daniel@gmail.com",
      username: "chiboy",
      password: "12345",
    };
    const profile = await UserService.createProfile(creds);

    expect(creds.email).toBe(profile.email);
    expect(creds.username).toBe(profile.username);
    expect(creds.password === profile.password).toBeFalsy();
    expect(Types.ObjectId.isValid(profile.id)).toBeTruthy();
  });

  test("throws error for invalid arguments", async () => {
    const creds = {
      email: "daniel@gmail.com",
      username: "chiboy",
    };
    try {
      await UserService.createProfile(creds);
    } catch (error) {
      const user = await UserModel.findOne({ username: creds.username });
      expect(user).toBeNull();
      expect(error.message).toBe(ERRORS.BAD_ARGS);
    }
  });

  test("throws error for duplicate user details", async () => {
    const creds = {
      email: "daniel@gmail.com",
      username: "chiboy",
      password: "12345",
    };
    try {
      await UserService.createProfile(creds);
      await UserService.createProfile(creds);
    } catch (error) {
      expect(error.message).toBe(ERRORS.DUPLICATE);
    }
  });
});

describe("single users Fetching", () => {
  test("returns null with invalid user creds", async () => {
    const user = await UserService.getUser({
      id: "nonexistentId",
      email: "nonexistentemail",
    });
    expect(user).toBeNull();
  });
});

describe("User Creds Validation", () => {
  const creds = {
    email: "daniel@gmail.com",
    username: "chiboy",
    password: "12345",
  };
  beforeEach(async () => {
    await UserService.createProfile(creds);
  });
  test("returns user profile with valid username and password", async () => {
    const user = await UserService.validateCreds({
      username: creds.username,
      password: creds.password,
    });
    expect(user).toBeTruthy();
    expect(creds.email).toBe(user.email);
    expect(creds.username).toBe(user.username);
  });

  test("returns null user with invalid username", async () => {
    const user = await UserService.validateCreds({
      username: creds.username,
      password: "a very wrong password",
    });
    expect(user).toBeNull();
  });

  test("returns null user with invalid password", async () => {
    const user = await UserService.validateCreds({
      username: "a very wrong username",
      password: creds.password,
    });
    expect(user).toBeNull();
  });
});

describe("Verify User", () => {
  // test("returns user profile with valid id, username, email in db", async () => {
  //   let user = await UserService.getUser({ email: testUser.email });
  //   expect(user).toBeTruthy();
  //   expect(testUser.email).toBe(user.email);
  // });
});
