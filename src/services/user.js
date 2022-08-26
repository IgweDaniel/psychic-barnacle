const bcrypt = require("bcryptjs");
import UserModel from "@/models/user";
import { ERRORS } from "@/constants";

function getUser() {}

export async function validateCredentials({}) {}

export function authenticate() {}
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
export async function getUserProfile({ username, email, id }) {
  let user = null;
  const cond = {
    ...(id && { _id: id }),
    ...(username && { username }),
    ...(email && { email }),
  };

  if (Object.keys(cond) < 1) return user;
  try {
    user = await UserModel.findOne(cond);
  } catch (error) {
    console.log({ error });
    if (!error.message.includes("Cast")) {
      throw error;
    }
  }
  return user;
}

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
