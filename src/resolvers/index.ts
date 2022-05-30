import { authorQuery, authorRelationResolver } from "./authorResolver";
import { bookQuery } from "./bookResolver";

const resolvers = {
  Query: {
    ...bookQuery,
    ...authorQuery,
  },
  Author: {
    ...authorRelationResolver,
  },
  // Mutation: {},
};

export default resolvers;
