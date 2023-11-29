import { defineArrayMember, defineType } from "sanity";
import { Tweet } from "../../components/Tweet";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // @ts-ignore
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      // @ts-ignore
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
        {
          name: "label",
          type: "string",
          title: "Label",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "tweet",
      title: "Tweet",
      // @ts-ignore
      fields: [
        {
          name: "id",
          type: "string",
          title: "Tweet ID",
        },
      ],
      components: {
        preview: Tweet as any,
      },
      preview: {
        select: {
          id: "id",
        },
      },
    }),
  ],
});
