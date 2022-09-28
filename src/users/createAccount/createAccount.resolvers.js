import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, githubUsername }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          console.log(existingUser);
          return {
            ok: false,
            error: "This username/email is already taken.",
          };
          //throw new Error("This username/email is already taken.");
        }
        
        const uglyPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: uglyPassword,
            githubUsername,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "Can't create account",
        };
      }
    },
  },
};
