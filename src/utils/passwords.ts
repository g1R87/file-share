import argon2 from "argon2";
import createError from "http-errors";

export const hashPassword = (password: string): Promise<string> => {
  try {
    return argon2.hash(password);
  } catch (error: any) {
    throw createError(500, error.message);
  }
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await argon2.verify(hash, password);
  } catch (error: any) {
    throw createError(500, error.message);
  }
};
