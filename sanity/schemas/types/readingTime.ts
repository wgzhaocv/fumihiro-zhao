import ReadingTimeInput from "@/sanity/components/readingTimeInput";
import { defineField } from "sanity";

export const readingTimeType = defineField({
  name: "readingTime",
  type: "number",
  title: "Reading Time",
  description: "Estimated reading time in minutes",
  components: {
    input: ReadingTimeInput,
  },
});
