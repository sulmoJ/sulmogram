import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    // __(double under score는 부모 arguments를 뜻함)
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      return {
        user: userProfile,
        posts,
      };
    },
  },
};
