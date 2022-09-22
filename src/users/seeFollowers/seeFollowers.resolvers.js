import client from "../../client";

// Offset pagination
const resolverFn = async (_, { username, page }) => {
  const ok = await client.user.findUnique({
    where: { username },
    select: { id: true },
  });
  if (!ok) {
    return {
      ok: false,
      error: "User not found",
    };
  }

  /*
  const followers_A = await client.user
    .findUnique({ where: { username } })
    .followers();

  const followers_B = await client.user.findMany({
    where: {
      following: {
        some: {username},
      },
    },
  });
  console.log(followers_A);
  console.log(followers_B);
  */

  const followers = await client.user
    .findUnique({ where: { username } })
    .followers({
      take: 5,
      skip: 5 * (page - 1),
    });

  /*  // XXX: Bad Idea for retrieving count
  const totalFollower = await client.user.findMany({
    where: {
      following: {
        some: {
          username,
        },
      },
    },
  });
  console.log(totalFollower.length);
  */
  const totalFollowersCount = await client.user.count({
    where: {
      following: {
        some: {
          username,
        },
      },
    },
  });
  return {
    ok: true,
    followers,
    totalPages: Math.ceil(totalFollowersCount / 5),
  };
};

export default {
  Query: {
    seeFollowers: resolverFn,
  },
};
