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
//       add the mutation to create a document
//       add arguments to mdEditor for readOnly and initialValue
//       add the query to /document/[pid] to query the document containing the id
//       make everything typesafe.
//       maybe change the font.

type createDocumentInput = {
  value: Descendant[];
};
type MutationData = {
  createDocument: NexusGenFieldTypes["Document"];
};

//here should be the query to save the mutation
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
      <div className="min-h-screen bg-background pb-24">
        {/* prose */}
        <div className="prose-lg prose prose-red ml-auto mr-auto text-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:mb-1 prose-h1:pt-6 prose-h1:text-3xl prose-h2:mb-6 prose-h2:pt-6 prose-h2:text-2xl prose-h3:mb-1 prose-h3:pt-4 prose-h3:text-lg prose-blockquote:text-foreground prose-ul:m-0 prose-ul:mt-1 prose-ul:mb-0 prose-ul:pb-0">
          {/* container */}
          <div className="w-full max-w-[900px] p-4 pt-10">
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
