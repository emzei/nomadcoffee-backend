import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      password: String
      name: String
      location: String
      email: String
      avatarURL: String
      githubUsername: String
    ): EditProfileResult
  }
`;
