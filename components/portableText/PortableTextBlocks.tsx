import { type PortableTextComponentProps } from "@portabletext/react";
import React from "react";

import { ClientOnly } from "@/components/ClientOnly";

export const PortableTextBlocksNormal = ({
  value,
  children,
}: PortableTextComponentProps<any>) => {
  const isEmpty = value.children
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .map((child: any) => ("text" in child ? child.text : ""))
    .join("");
  return (
    <p
      data-id={isEmpty ? undefined : value._key}
      className="group relative pr-3 md:pr-0"
    >
      {children}
    </p>
  );
};

export const PortableTextBlocksH1 = ({
  value,
  children,
}: PortableTextComponentProps<any>) => {
  return (
    <h1
      id={value._key}
      data-id={value._key}
      className="group relative pr-3 after:pointer-events-none after:inline after:select-none after:opacity-0 after:transition-opacity after:will-change-[opacity] after:content-['_#'] hover:after:opacity-10 md:pr-0"
    >
      {children}
    </h1>
  );
};

export const PortableTextBlocksH2 = ({
  value,
  children,
}: PortableTextComponentProps<any>) => {
  return (
    <h2
      id={value._key}
      data-id={value._key}
      className="group relative pr-3 after:pointer-events-none after:inline after:select-none after:opacity-0 after:transition-opacity after:will-change-[opacity] after:content-['_#'] hover:after:opacity-100 md:pr-0"
    >
      <a href={`#${value._key as string}`} className="absolute inset-0" />
      {children}
    </h2>
  );
};

export const PortableTextBlocksH3 = ({
  value,
  children,
}: PortableTextComponentProps<any>) => {
  return (
    <h3
      id={value._key}
      data-id={value._key}
      className="group relative pr-3 after:pointer-events-none after:inline after:select-none after:opacity-0 after:transition-opacity after:will-change-[opacity] after:content-['_#'] hover:after:opacity-10 md:pr-0"
    >
      <a href={`#${value._key as string}`} className="absolute inset-0" />
      {children}
    </h3>
  );
};

export const PortableTextBlocksH4 = ({
  value,
  children,
}: PortableTextComponentProps<any>) => {
  return (
    <h4
      id={value._key}
      data-id={value._key}
      className="group relative pr-3 after:pointer-events-none after:inline after:select-none after:opacity-0 after:transition-opacity after:will-change-[opacity] after:content-['_#'] hover:after:opacity-10 md:pr-0"
    >
      <a href={`#${value._key as string}`} className="absolute inset-0" />
      {children}
    </h4>
  );
};

export const PortableTextBlocksH5 = ({
  value,
  children,
}: PortableTextComponentProps<any>) => {
  return (
    <h5
      id={value._key}
      data-id={value._key}
      className="group relative pr-3 after:pointer-events-none after:inline after:select-none after:opacity-0 after:transition-opacity after:will-change-[opacity] after:content-['_#'] hover:after:opacity-10 md:pr-0"
    >
      <a href={`#${value._key as string}`} className="absolute inset-0" />
      {children}
    </h5>
  );
};

export const PortableTextBlocksBlockquote = ({
  value,
  children,
}: PortableTextComponentProps<any>) => {
  return (
    <blockquote
      id={value._key}
      data-id={value._key}
      className=" group relative pr-3 md:pr-0"
    >
      {children}
    </blockquote>
  );
};

export const PortableTextBlocksListItem = ({
  value,
  children,
}: PortableTextComponentProps<any>) => {
  return (
    <li
      id={value._key}
      data-id={value._key}
      className="group relative pr-3 md:pr-0"
    >
      {children}
    </li>
  );
};
