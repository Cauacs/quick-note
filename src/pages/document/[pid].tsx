import { ApolloClient } from "@apollo/client";
import { GetServerSideProps } from "next";
import { Descendant } from "slate";
import { MdEditor } from "src/components/Editor";
import { GET_DOCUMENT_BY_ID } from "src/queries/documentByID";
import { initializeApollo } from "src/utils/apolloClient";

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
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-r from-rose-100 to-teal-100 py-8 lg:py-12">
      {/* prose */}
      <div className="relative w-full bg-white px-6 py-12 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:mx-auto md:max-w-3xl lg:max-w-4xl lg:pt-16 lg:pb-28">
        {/* container */}
        <div className="prose-lg prose ml-auto mr-auto">
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
  const client = initializeApollo();

  if (context.params && context.params.pid) {
    const { data } = await client.query<queryResponse>({
      query: GET_DOCUMENT_BY_ID,
      variables: { documentId: context.params.pid },
    });
    return {
      props: {
        data,
        initialApolloState: client.cache.extract(),
      },
    };
  } else {
    return { notFound: true };
  }
};

export default Document;
