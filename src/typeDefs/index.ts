import { gql } from "apollo-server-core";

export default gql`
  type Book {
    id: ID
    title: String
    body: String
  }

  type Author {
    id: ID
    name: String
    books: [Book]
  }

  type Query {
    books: [Book]
    author(id: ID!): Author
  }
`;
