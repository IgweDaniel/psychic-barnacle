import UserModel from "@/models/user";
import { ERRORS } from "@/constants";
import VerifyTokenModel from "@/models/VerifyToken";
import { AuthService, UserService } from "@/services";

let testUser;
beforeEach(async () => {
  testUser = await UserModel.create({
    email: "test_email@mail.com",
    password: "test_password",
    username: "test_username",
  });
});

test("creates and returns verificationLink for exisiting email", async () => {
  const link = await AuthService.createVerifyLink(testUser.email);
  expect(link).toBeTruthy();

  const token = await VerifyTokenModel.findOne({
    user: testUser,
    token: link.substr(link.lastIndexOf("/") + 1),
  }).populate("user");

  expect(token).toBeTruthy();
  expect(token.user.id).toBe(testUser.id);
});
