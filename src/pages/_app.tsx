// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "src/utils/apolloClient";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
