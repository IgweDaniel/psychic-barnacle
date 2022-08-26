import jwt from "jsonwebtoken";
import config from "@/config";
import { v4 as uuidv4 } from "uuid";
import VerifyTokenModel from "@/models/VerifyToken";
import { ERRORS } from "@/constants";
import { UserService } from "./";

export function createAccessToken(userId) {
  const expiresIn = 15 * 60;
  const token = jwt.sign(userId, config.api.jwtSecret, { expiresIn });
  return {
    token,
    expiresIn,
  };
}

export function decodeToken(token) {
  const payload = jwt.verify(token, config.api.jwtSecret);

  return payload.userId;
}

export function createRefreshToken(userId) {
  const accessToken = createAccessToken();
  const refreshToken = jwt.sign(userId, config.api.jwtSecret);
  return { accessToken, refreshToken };
}

export async function createVerifyLink(email) {
  try {
    const user = await UserService.getUser({ email });
    if (!user) {
      throw new Error(ERRORS.NONEXISTENT_ENTITY);
    }
    const randId = uuidv4().replace(/-/g, "");

    await VerifyTokenModel.create({
      user,
      token: randId,
    });
    const verifyLink = `${config.websiteUrl}/verify/${randId}`;

    return verifyLink;
  } catch (error) {
    throw error;
  }
}
