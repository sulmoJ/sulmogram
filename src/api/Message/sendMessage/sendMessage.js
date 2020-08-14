import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId == undefined) {
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              connect: [
                {
                  id: toId,
                },
                {
                  id: user.id,
                },
              ],
            },
          }).$fragment(`fragment RoomParts on Room {
            id
            participants {
              id
            }
          }`);
        }
      } else {
        room = await prisma.room({ id: roomId })
          .$fragment(`fragment RoomParts on Room {
          id
          participants {
            id
          }
        }`);
      }
      if (!room) {
        throw Error("Room not found");
      }
      console.log(room.participants);
      const getTo = room.participants.filter(
        (participant) => participant.id !== user.id
      )[0];
      console.log(user.id);
      console.log(getTo.id);
      console.log(toId);
      console.log(room.id);
      return prisma.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id,
          },
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId,
          },
        },
        room: {
          connect: {
            id: room.id,
          },
        },
      });
    },
  },
};
