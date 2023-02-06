// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/utils/apolloClient";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
