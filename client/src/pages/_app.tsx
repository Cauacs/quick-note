// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const MyApp: AppType = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    uri: "http://localhost:8888/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
