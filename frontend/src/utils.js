import { customAlphabet } from "nanoid";

export const DB_URL = "https://hackaton-ct-2025.onrender.com/api";

export const createRoomID = () => {
  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 12);
  return nanoid();
};
