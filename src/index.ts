import env from "@/env";
import axios from "axios";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";

const server = new GraphQLServer({
  schema,
  context: {
    client: axios
  }
});

const serverOptions = {
  port: env('PORT')
};

server.start(
  serverOptions,
  () => {
    console.log(`Server is running on localhost:${serverOptions.port}`);
  }
);
