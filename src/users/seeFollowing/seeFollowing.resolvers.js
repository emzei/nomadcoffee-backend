import client from "../../client";

// Cursor pagination
const resolverFn = async (_, { username, lastId }) => {

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

  const following = await client.user
    .findUnique({ where: { username } })
    .following({
      take: 5,
      skip: lastId? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    });

  return {
    ok: true,
    following,
  };
};

export default {
  Query: {
    seeFollowing: resolverFn,
  },
};
