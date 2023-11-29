import { type SchemaTypeDefinition } from "sanity";
import post from "./schemas/post";
import blockContent from "./schemas/types/blockContent";
import { readingTimeType } from "./schemas/types/readingTime";
import category from "./schemas/category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, readingTimeType, category],
};
