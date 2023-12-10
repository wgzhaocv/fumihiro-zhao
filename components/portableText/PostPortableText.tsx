"use client";
import { PortableText } from "@portabletext/react";

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

const componnets = {
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
};

type PostPortableTextProps = {
  value: any;
};

const PostPortableText = ({ value }: PostPortableTextProps) => {
  return <>PostPortableText</>;
};
export default PostPortableText;
