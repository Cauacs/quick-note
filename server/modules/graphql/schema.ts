import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types";
import { JSON } from "./json";

const schema = makeSchema({
  types: [JSON, types],
  contextType: {
    module: join(process.cwd(), "./types/Context.ts"),
    export: "Context",
  },
  outputs: {
    schema: join(process.cwd(), "./generated/schema.graphql"),
    typegen: join(process.cwd(), "./generated/nexus-typegen.d.ts"),
  },
});

export { schema };
