// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const MyApp: AppType = ({ Component, pageProps }) => {
  // const link = new HttpLink({
  //   uri: "http://localhost:8888/.netlify/functions/graphql",
  //   //uri: "https://melodious-lokum-7f4d41.netlify.app/.netlify/functions/graphql",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
