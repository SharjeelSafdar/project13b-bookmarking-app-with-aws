<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Project 13B: Serverless JAMstack Bookmarking App with Gatsby, AppSync, DynamoDB, CloudFront and TypeScript
</h1>

## Link to Web App

The web app has been deployed to AWS CloudFront, and can be accessed [here](https://dw53lvip47mcd.cloudfront.net/).

## Frontend

The following are some of the features of this project:

- A dashboard for a user to manage his/her bookmarks
- Possible interactions with bookmarks: create a new bookmark, update an existing bookmark, delete a bookmark and batch delete existing bookmarks
- A [DynamoDB](https://aws.amazon.com/dynamodb/) table to store bookmarks
- A GraphQL API with [AWS AppSync](https://aws.amazon.com/appsync/) to interact with DynamoDB
- Demonstrates CRUD operations using DynamoDB through the GraphQL API
- Uses [Amplify](https://amplify.com/) for GraphQL queries and mutations on client side
- Bootstrapped with [GatsbyJS](https://www.gatsbyjs.com/)
- Additionally, includes TypeScript support for gatsby-config, gatsby-node, gatsby-browser and gatsby-ssr files
- Site hosted on [AWS CloudFront](https://aws.amazon.com/cloudfront/)
- CI/CD with [GitHub Actions](https://docs.github.com/en/actions)
- Completely typed with [TypeScript](https://www.typescriptlang.org/)
- Completely interactive and responsive design with [Material-UI](https://material-ui.com/) components.

## Backend

This AWS CDK App deploys the backend infrastructure for [Project 13B](https://github.com/SharjeelSafdar/project13b-bookmarking-app-with-aws). The app consists of two stacks.

### Stack 1: AppSync GraphQL API and DynamoDB Table

It contanis of the AWS services used by the web client. It has the following constructs:

- A DynamoDB Table to contain the bookmarks saved by the users
- An AppSync GraphQL API to access the bookmarks in the Table

### Stack 2: CloudFront Distribution and S3 Bucket

It contains the infrastructure to deploy frontend client. It has the following constructs:

- A S3 Bucket with public access to store the static assets of Gatsby web app
- A Cloud Front Distribution to serve the static assets through a CDN
