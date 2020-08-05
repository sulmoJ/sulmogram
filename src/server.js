import dotenv from "dotenv";
import path from "path";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    request,
  }),
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
//JWT로 보호중

server.start({ port: PORT }, () =>
  console.log(`server running on : http://localhost:${PORT}`)
);
