import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
const resolverFn = async (
  _,
  {
    username,
    password: newPassword,
    name,
    location,
    email,
    avatar,
    githubUsername,
  },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:${process.env.PORT}/static/${newFilename}`;
  }
  
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      name,
      location,
      email,
      githubUsername,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatarURL:avatarUrl }),
    },
  });

  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "could not update profile",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
  Upload: GraphQLUpload,
};
