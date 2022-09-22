import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: (_, { id }) =>
      client.coffeeShop.findUnique({
        // findUnique searches unique field only
        where: {
          id,
        },
      }),
  },
};
