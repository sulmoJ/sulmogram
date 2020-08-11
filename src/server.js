import dotenv from "dotenv";
import path from "path";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    request,
    isAuthenticated,
  }),
});

server.express.use(logger("dev"));
//JWT stratege를 기반한 passport 사용중
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`server running on : http://localhost:${PORT}`)
);
