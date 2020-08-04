import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { secret, email } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        //JWT
        return "TOKEN";
      } else {
        throw Error("wrong email/secret convination");
      }
    },
  },
};
