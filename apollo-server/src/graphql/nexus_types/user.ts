import { extendType, objectType } from "nexus";
import { getAllUsersResolver } from "../resolvers/userResolvers";

export const user = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("email");
    t.string("name");
  },
});

export const getAllUsers = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve: getAllUsersResolver,
    });
  },
});
