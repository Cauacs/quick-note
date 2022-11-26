import { JSONResolver } from "graphql-scalars";
import { asNexusMethod } from "nexus";
export const JSON = asNexusMethod(JSONResolver, "json");
