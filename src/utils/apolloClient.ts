import { ApolloClient, InMemoryCache } from "@apollo/client";
import { env } from "../env/client.mjs";

export const client = new ApolloClient({
  //uri: "http://localhost:3000/api/graphql",
  uri: env.NEXT_PUBLIC_ROOT_URL + "/api/graphql",
  cache: new InMemoryCache(),
});
