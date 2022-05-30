import startApollo from "./server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

startApollo(typeDefs, resolvers);
