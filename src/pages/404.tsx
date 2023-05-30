import { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";

const NotFoundPage: FC<PageProps> = () => {
  return <main>404</main>;
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
