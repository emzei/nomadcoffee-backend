import { gql } from "apollo-server";

export default gql`
  type createCoffeeShopResult {
    ok: Boolean!
    error: String
    shopId: Int
  }

  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      photo: Upload
      category: String
    ): createCoffeeShopResult!
  }
  scalar Upload
`;
