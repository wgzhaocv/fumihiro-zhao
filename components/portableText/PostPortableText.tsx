"use client";
import { PortableText, PortableTextComponents } from "@portabletext/react";

import {
  PortableTextBlocksBlockquote,
  PortableTextBlocksH1,
  PortableTextBlocksH2,
  PortableTextBlocksH3,
  PortableTextBlocksH4,
  PortableTextBlocksH5,
  PortableTextBlocksListItem,
  PortableTextBlocksNormal,
} from "./PortableTextBlocks";
import { PortableTextCodeBlock } from "./PortableTextCodeBlock";
import { PortableTextImage } from "./PortableTextImage";

const myComponnets = {
  block: {
    normal: PortableTextBlocksNormal,
    h1: PortableTextBlocksH1,
    h2: PortableTextBlocksH2,
    h3: PortableTextBlocksH3,
    h4: PortableTextBlocksH4,
    h5: PortableTextBlocksH5,
    blockquote: PortableTextBlocksBlockquote,
  },
  listItem: PortableTextBlocksListItem,
  types: {
    codeBlock: PortableTextCodeBlock,
    image: PortableTextImage,
  },
};

type PostPortableTextProps = {
  value: any;
  components?: PortableTextComponents;
};

const PostPortableText = ({ value }: PostPortableTextProps) => {
  return <PortableText value={value} components={myComponnets} />;
};
export default PostPortableText;
