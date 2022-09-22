import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { id, lastId }) =>
      client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              id: {
                equals: id,
              },
            },
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
      }),
  },
};
