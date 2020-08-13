import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: (_, args) => {
      const { id } = args;
      return prisma.post({ id }).$fragment(`
      fragment PostPart on Post {
        id
        location
        caption
        files{
          id
          url
        }
        comments{
          id
          text
          user {
            username
          }
        }
        user {
          id
          username
        }
      }
    `);
    },
  },
};
