import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, bio = "", firstName = "", lastName = "" } = args;
      const existUser = await prisma.$exists.user({ username });
      const existEmail = await prisma.$exists.user({ email });
      if (existUser) {
        throw Error("이미 존재하는 username입니다.");
      }
      if (existEmail) {
        throw Error("이미 존재하는 이메일입니다.");
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return true;
    },
  },
};
