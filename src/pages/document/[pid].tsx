import { NextPage } from "next";
import { useRouter } from "next/router";

const Document: NextPage = () => {
  const router = useRouter();
  return <div>{JSON.stringify(router.query, null, 2)}</div>;
};

export default Document;
