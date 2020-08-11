import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    // __(double under score는 부모 arguments를 뜻함)
    me: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      
      return prisma.user({ id: user.id }).$fragment(`
      fragment UserParts on User{
        id
        username
        email
        firstName
        lastName
        bio
        posts{
          id
          caption
        }
      }
    `);
    },
  },
};
