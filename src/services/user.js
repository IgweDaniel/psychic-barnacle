const bcrypt = require("bcryptjs");
import UserModel from "@/models/user";
import { ERRORS } from "@/constants";

export async function validateCredentials({}) {}

export function changeAvatar() {}
export function editProfile() {}
export function updateUIPref() {}
export function verifyEmail() {}
export function changePassword() {}
export function resetPassword() {}
export async function createProfile({ email, username, password }) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({ email, password: hash, username });

    return user;
  } catch (error) {
    if (error.code == "11000" && error.name.includes("Mongo")) {
      throw new Error(ERRORS.DUPLICATE);
    } else if (
      error?.name === "ValidationError" ||
      error.message.includes("arguments")
    ) {
      throw new Error(ERRORS.BAD_ARGS);
    } else {
      throw error;
    }
    //
  }
}
export async function getUser(cond) {
  let user = null;
  try {
    user = await UserModel.findOne(cond);
  } catch (error) {
    if (!error.message.includes("Cast")) {
      throw error;
    }
  }
  return user;
}

export async function validateCreds({ username, password }) {
  try {
    const user = await getUser({ username });
    if (!user) {
      return null;
    }

    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
export function verifyUser(verificationCode) {}

export function scheduleAcctDeletion() {}

export function blockUser() {}
export function favoriteUser() {}

export function addContact() {}
export function deleteContact() {}
export function updateContact() {}
export function getContactList() {}

export function addToCallList() {}
export function clearCallList() {}
export function getCallList() {}
