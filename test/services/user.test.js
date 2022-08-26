import { UserService, AuthService } from "@/services";
import UserModel from "@/models/user";
import { Types } from "mongoose";
import { ERRORS, CALL_TYPE } from "@/constants";

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
  let testUser;

  beforeEach(async () => {
    testUser = await UserModel.create({
      email: "test_email@mail.com",
      username: "test_username",
      password: "test_password",
    });
  });
  test("updates verified state given valid verifyToken", async () => {
    const link = await AuthService.createVerifyLink(testUser.email);
    const token = link.substr(link.lastIndexOf("/") + 1);

    const verified = await UserService.verifyUser(token);
    expect(verified).toBeTruthy();

    const user = await UserService.getUser({ email: testUser.email });
    expect(user.verified).toBeTruthy();
  });

  test("fails to update verified state given invalid verifyToken", async () => {
    const verified = await UserService.verifyUser("<faketokenid>");
    expect(verified).toBeFalsy();
  });
});

describe("Update User Password", () => {
  let testUser,
    testPassword = "12345";
  beforeEach(async () => {
    testUser = await UserService.createProfile({
      email: "daniel@gmail.com",
      username: "chiboy",
      password: testPassword,
    });
  });

  test("updates newpassword & invalidates oldpassword", async () => {
    const newPassword = "newTestPassword";
    const changed = await UserService.changePassword(testUser.id, newPassword);
    expect(changed).toBeTruthy();

    let user = await UserService.validateCreds({
      username: testUser.username,
      password: testPassword,
    });
    expect(user).toBeNull();

    user = await UserService.validateCreds({
      username: testUser.username,
      password: newPassword,
    });
    expect(user).toBeTruthy();
    expect(user.email).toBe(testUser.email);
  });
});

describe("User Contacts", () => {
  let user1, user2;
  beforeEach(async () => {
    [user1, user2] = await Promise.all([
      UserModel.create({
        email: "daniel@gmail.com",
        username: "chiboy",
        password: "password",
      }),
      UserModel.create({
        email: "tetst@gmail.com",
        username: "testy",
        password: "password",
      }),
    ]);
  });

  test("adds contact for user", async () => {
    const callType = CALL_TYPE.VIDEO;

    const callsList = await UserService.addToCallList(user1, {
      callType,
      userId: user2.id,
    });

    expect(callsList).toHaveLength(1);
    expect(callsList[0].user.id).toBe(user2.id);
    expect(callsList[0].type).toBe(callType);
  });
});

// describe("User Contacts", () => {
//   let user1, user2;
//   beforeEach(async () => {
//     [user1, user2] = await UserModel.insertMany([
//       {
//         email: "daniel@gmail.com",
//         username: "chiboy",
//         password: "password",
//       },
//       {
//         email: "tetst@gmail.com",
//         username: "testy",
//         password: "password",
//       },
//     ]);
//   });

//   test("adds contact for user", async () => {
//     const res = await UserService.addContact(user1, user2.email);
//     console.log(res);
//     // expect(changed).toBeTruthy();

//     // let user = await UserService.validateCreds({
//     //   username: testUser.username,
//     //   password: testPassword,
//     // });
//     // expect(user).toBeNull();

//     // user = await UserService.validateCreds({
//     //   username: testUser.username,
//     //   password: newPassword,
//     // });
//     // expect(user).toBeTruthy();
//     // expect(user.email).toBe(testUser.email);
//   });
// });
