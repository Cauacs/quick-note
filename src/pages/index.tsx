import { gql, useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { CreateButton } from "../components/Button";
import { MdEditor } from "../components/Editor";
import { CREATE_DOCUMENT } from "src/mutations/createDocument";
import { initialValue } from "src/utils/initialValue";
import { useState } from "react";
import {
  NexusGenInputs,
  NexusGenFieldTypes,
} from "apollo-server/generated/nexus-typegen";
import { Descendant } from "slate";
import { useRouter } from "next/router";

// TODO:
//       add the support for bold italic etc...
//       maybe change the font.

type createDocumentInput = {
  value: Descendant[];
};
type MutationData = {
  createDocument: NexusGenFieldTypes["Document"];
};

const Home: NextPage = () => {
  const [createDocument, { data, loading, error }] = useMutation<
    MutationData,
    createDocumentInput
  >(CREATE_DOCUMENT);

  const router = useRouter();

  const [value, setValue] = useState(initialValue);
  const onClickCreate = async () => {
    await createDocument({ variables: { value } })
      .then((res) => router.push("/document/" + res.data?.createDocument.id))
      // .then((res) =>
      //   router.push({
      //     pathname: "/document" + res.data?.createDocument.id,
      //   })
      // )
      .catch((err) => alert(err));
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      {/* editor */}
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-r from-rose-100 to-teal-100 py-8 lg:py-12">
        {/* prose */}
        {/* <div className="prose-lg prose prose-red ml-auto mr-auto text-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:mb-1 prose-h1:pt-6 prose-h1:text-3xl prose-h2:mb-6 prose-h2:pt-6 prose-h2:text-2xl prose-h3:mb-1 prose-h3:pt-4 prose-h3:text-lg prose-p:text-foreground prose-blockquote:text-foreground prose-strong:text-background prose-ul:m-0 prose-ul:mt-1 prose-ul:mb-0 prose-ul:pb-0"> */}
        <div className="relative w-full bg-white px-6 py-12 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:mx-auto md:max-w-3xl lg:max-w-4xl lg:pt-16 lg:pb-28">
          {/* container */}
          <div className="prose-lg prose ml-auto mr-auto">
            <MdEditor value={value} setValue={setValue} isReadOnly={false} />
            <div className="text-right">
              <CreateButton onClickCreate={onClickCreate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
