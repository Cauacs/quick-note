import { GetServerSideProps } from "next";
import { Descendant } from "slate";
import { MdEditor } from "src/components/Editor";
import { GET_DOCUMENT_BY_ID } from "src/queries/documentByID";
import { client } from "src/utils/apolloClient";

type queryResponse = {
  Document: {
    id: string;
    createAt: string;
    value: Descendant[];
  };
};

function Document({ data }: { data: queryResponse }) {
  if (!data?.Document) {
    return <div>No value</div>;
  }
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* prose */}
      <div className="prose-lg prose prose-red ml-auto mr-auto text-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:mb-1 prose-h1:pt-6 prose-h1:text-3xl prose-h2:mb-6 prose-h2:pt-6 prose-h2:text-2xl prose-h3:mb-1 prose-h3:pt-4 prose-h3:text-lg prose-blockquote:text-foreground prose-ul:m-0 prose-ul:mt-1 prose-ul:mb-0 prose-ul:pb-0">
        {/* container */}
        <div className="w-full max-w-[900px] p-4 pt-10">
          <MdEditor value={data.Document.value} isReadOnly={true} />
        </div>
      </div>
    </div>
    //<div>{JSON.stringify(data, null, 2)}</div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: queryResponse;
}> = async (context) => {
  if (context.params && context.params.pid) {
    const { data } = await client.query<queryResponse>({
      query: GET_DOCUMENT_BY_ID,
      variables: { documentId: context.params.pid },
    });
    return {
      props: { data },
    };
  } else {
    return { notFound: true };
  }
};

export default Document;
