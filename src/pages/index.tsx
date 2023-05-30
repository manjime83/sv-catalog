import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";

const IndexPage: FC<PageProps> = () => {
  return <h1>Bay, aca quedara tu sitio</h1>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
