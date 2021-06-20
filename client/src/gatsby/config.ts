import { GatsbyConfig } from "gatsby";

export default {
  siteMetadata: {
    title: `Bookmarking App`,
    description: `A Serverless JAMstack Bookmarking App with Gatsby, AppSync, DynamoDB, CloudFront and TypeScript`,
    author: `Mian Muhammad Sharjeel Safdar`,
  },
  plugins: [
    // `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bookmarking App`,
        short_name: `Bookmarking App`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
} as GatsbyConfig;
