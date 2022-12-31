import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { CreateButton } from "../components/Button";
import { MdEditor } from "../components/Editor";
import { Descendant } from "slate";

// TODO:
//       integrate with backend.
//       Add the router
//       maybe change the font.

const Home: NextPage = () => {
  type DocumentsData = {
    documents: {
      id: string;
      value: Descendant[];
    }[];
  };
  const { data, loading, error } = useQuery<DocumentsData>(gql`
    query Documents {
      documents {
        id
        value
      }
    }
  `);
  console.log(data?.documents[0]?.value);

  return (
    <>
      {/* editor */}
      <div className="min-h-screen bg-background pb-24">
        {/* prose */}
        <div className="prose-lg prose prose-red ml-auto mr-auto text-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:mb-1 prose-h1:pt-6 prose-h1:text-3xl prose-h2:mb-6 prose-h2:pt-6 prose-h2:text-2xl prose-h3:mb-1 prose-h3:pt-4 prose-h3:text-lg prose-blockquote:text-foreground">
          {/* container */}
          <div className="w-full max-w-[900px] p-4 pt-10">
            <MdEditor />
            <div className="text-right">
              <CreateButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
