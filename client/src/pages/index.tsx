import React, { FC } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BookmarksDashboard from "../components/bookmarksDashboard";

const IndexPage: FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <BookmarksDashboard />
    </Layout>
  );
};

export default IndexPage;
