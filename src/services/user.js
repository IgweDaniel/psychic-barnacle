const bcrypt = require("bcryptjs");
import UserModel from "@/models/user";
import VerifyTokenModel from "@/models/VerifyToken";
import { ERRORS } from "@/constants";

export async function validateCredentials({}) {}

export function changeAvatar() {}
export function editProfile() {}
export function updateUIPref() {}

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
export async function getUser({ email, id, username }) {
  const cond = {
    ...(id && { _id: id }),
    ...(username && { username }),
    ...(email && { email }),
  };
  try {
    if (Object.keys(cond) < 1) {
      return null;
    }
    const user = await UserModel.findOne(cond);
    return user;
  } catch (error) {
    if (error.message.includes("Cast")) {
      return null;
    }
    throw error;
  }
}

export async function validateCreds({ username, password }) {
  try {
    const user = await getUser({ username });
    if (user) {
      const passwordValid = bcrypt.compareSync(password, user.password);
      return passwordValid ? user : null;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
export async function verifyUser(token) {
  try {
    const verifyToken = await VerifyTokenModel.findOne({ token });

    if (verifyToken) {
      const res = await UserModel.updateOne(
        { user: verifyToken.user },
        { verified: true }
      );

      return res.acknowledged;
    }

    return false;
  } catch (error) {
    if (error.message.includes("Cast")) {
      return false;
    }
    throw error;
  }
}

export async function changePassword(userId, password) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const res = await UserModel.updateOne({ _id: userId }, { password: hash });

    return res.acknowledged;
  } catch (error) {
    if (error.message.includes("Cast")) {
      return false;
    }
    throw error;
  }
}
// export function resetPassword(token, password) {}

export function scheduleAcctDeletion() {}

export function blockUser() {}
export function favoriteUser() {}

export function addContact(user, email) {}
export function deleteContact() {}
export function updateContact() {}
export function getContactList() {}

export async function addToCallList(user, call) {
  try {
    const callUser = await getUser({ id: call.userId });

    if (!callUser) {
      throw new Error(ERRORS.NONEXISTENT_ENTITY);
    }
    user.calls.push({ type: call?.callType, user: callUser });
    const newUser = await user.save();

    return newUser.calls;
  } catch (error) {
    throw error;
  }
}
export function clearCallList(user) {}
export function getCallList() {}
