import type { NextPage } from "next";
import { MdEditor } from "../components/Editor";

// TODO:
//       add insertBreak thing
//       add button to save
//       add todo list
//       add the type something

const Home: NextPage = () => {
  return (
    <>
      {/* editor */}
      <div className="min-h-screen bg-background pb-24">
        {/* prose */}
        <div className="prose-lg prose prose-red ml-auto mr-auto text-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:mb-1 prose-h1:pt-6 prose-h1:text-3xl prose-h2:mb-6 prose-h2:pt-6 prose-h2:text-2xl prose-h3:mb-1 prose-h3:pt-4 prose-h3:text-lg prose-blockquote:text-foreground">
          {/* container */}
          <div className="w-full max-w-[900px] p-4 pt-10">
            <MdEditor />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="border-gray-500 flex flex-col justify-center rounded border-2 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-gray-700 text-lg">{name}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <a
        className="text-violet-500 m-auto mt-3 w-fit text-sm underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
