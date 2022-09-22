import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { handlePhoto, processCategory } from "../coffeeShop.utils";

const resolverFn = async (
  _,
  { id, name, latitude, longitude, category, photo },
  { loggedInUser }
) => {
  try {
    const coffeeShop = await client.coffeeShop.findUnique({
      where: {
        id,
      },
      include: {
        categories: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!coffeeShop) {
      return {
        ok: false,
        error: "Coffee shop is not existed.",
      };
    }

    await client.coffeeShop.update({
      where: { id },
      data: {
        name,
        latitude,
        longitude,
        ...(category && {
          categories: {
            disconnect: coffeeShop.categories,
            connectOrCreate: processCategory(category),
          },
        }),
      },
    });

    if (photo) {
      const photoUrl = await handlePhoto(photo, loggedInUser.id);
      await client.coffeeShopPhoto.create({
        data: {
          url: photoUrl,
          shop: {
            connect: {
              id,
            },
          },
        },
      });
    }
    return {
      ok: true,
      shopId: id,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to update CoffeeShop",
    };
  }
};

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(resolverFn),
  },
  Upload: GraphQLUpload,
};
