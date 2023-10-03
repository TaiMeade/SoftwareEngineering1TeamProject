import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getAuth = async () => {
  return await getServerSession(authOptions);
};
