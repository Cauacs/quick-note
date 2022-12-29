import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./nexus_types/index";

const schema = makeSchema({
  types,
  contextType: {
    module: join(process.cwd(), "./apollo-server/src/types/Context.ts"),
    export: "Context",
  },
  outputs: {
    schema: join(process.cwd(), "./apollo-server/generated/schema.graphql"),
    typegen: join(
      process.cwd(),
      "./apollo-server/generated/nexus-typegen.d.ts"
    ),
  },
});

export { schema };
