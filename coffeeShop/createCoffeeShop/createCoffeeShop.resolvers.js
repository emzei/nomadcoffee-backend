import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { handlePhoto, processCategory } from "../coffeeShop.utils";

const resolverFn = async (
  _,
  { name, latitude, longitude, category, photo },
  { loggedInUser }
) => {
  try {
    const coffeeShop = await client.coffeeShop.create({
      data: {
        name,
        latitude,
        longitude,
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        categories: {
          connectOrCreate: processCategory(category),
        },
      },
    });
    if (photo) {
      const photoUrl = await handlePhoto(photo, loggedInUser.id);
      await client.coffeeShopPhoto.create({
        data: {
          url: photoUrl,
          shop: {
            connect: {
              id: coffeeShop.id,
            },
          },
        },
      });
    }
    return {
      ok: true,
      shopId: coffeeShop.id,
    };
  } catch(error) {
    return {
      ok: false,
      error: `${error}`,
    }
  }
};

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(resolverFn),
  },
  Upload: GraphQLUpload,
};
