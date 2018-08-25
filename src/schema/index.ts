import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const typeDefsArray = fileLoader(path.join(__dirname, "**/*.gql"));
const typeDefs = mergeTypes(typeDefsArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, "**/*.resolver.ts"));
const resolvers = mergeResolvers(resolversArray, { all: true });

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
