import { Author, Book } from "@prisma/client";
import { Queries } from "../../index";

export const authorQuery: Queries<Author | Author[], { id: string }> = {
  author: async (parents, args, { prisma }) => {
    const author = await prisma.author.findUnique({
      where: {
        id: args.id,
      },
      rejectOnNotFound: true,
    });
    return author;
  },
};

export const authorRelationResolver: Queries<Book[], { id: string }> = {
  books: async (parents, args, { prisma }) => {
    console.log(parents);
    const books = await prisma.author
      .findUnique({
        where: {
          id: parents.id,
        },
      })
      .books();
    return books;
  },
};
