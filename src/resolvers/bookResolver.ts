import { Book } from "@prisma/client";
import { Queries } from "../../index";

export const bookQuery: Queries<Book | Book[], { id: string }> = {
  books: async (parents, args, { prisma }) => {
    const book = await prisma.book.findMany();
    return book;
  },
};
