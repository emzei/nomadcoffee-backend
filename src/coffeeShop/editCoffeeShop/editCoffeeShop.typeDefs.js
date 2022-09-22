import { gql } from "apollo-server";

export default gql`
  type EditCoffeeShopResult {
    ok: Boolean!
    error: String
    shopId: Int
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: String
      longitude: String
      photo: Upload
      category: String
    ): EditCoffeeShopResult!
  }
`;
