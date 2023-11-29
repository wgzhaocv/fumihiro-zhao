import ReadingTimeInput from "../../components/readingTimeInput";
import { defineField, defineType } from "sanity";

export const readingTimeType = defineType({
  name: "readingTime",
  type: "number",
  title: "Reading Time",
  description: "Estimated reading time in minutes",
  components: {
    input: ReadingTimeInput,
  },
});
