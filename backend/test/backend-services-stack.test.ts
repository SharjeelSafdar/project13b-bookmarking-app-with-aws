import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as P13bBackendServices from "../lib/backend-services-stack";

test("Stack has a DynamoDB Table", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(haveResource("AWS::DynamoDB::Table"));
});

test("Stack has an AppSync GraphQL API", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(haveResource("AWS::AppSync::GraphQLApi"));
});

test("GraphQL API has a DynamoDB Data Source", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::AppSync::DataSource", {
      Type: "AMAZON_DYNAMODB",
    })
  );
});

test(`DynamoDB Data Source has "bookmarks" query resolver`, () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::AppSync::Resolver", {
      TypeName: "Query",
      FieldName: "bookmarks",
    })
  );
});

test(`DynamoDB Data Source has "createBookmark" mutation resolver`, () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::AppSync::Resolver", {
      TypeName: "Mutation",
      FieldName: "createBookmark",
    })
  );
});

test(`DynamoDB Data Source has "editBookmark" mutation resolver`, () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::AppSync::Resolver", {
      TypeName: "Mutation",
      FieldName: "editBookmark",
    })
  );
});

test(`DynamoDB Data Source has "deleteBookmark" mutation resolver`, () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::AppSync::Resolver", {
      TypeName: "Mutation",
      FieldName: "deleteBookmark",
    })
  );
});

test(`DynamoDB Data Source has "batchDeleteBookmarks" mutation resolver`, () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::AppSync::Resolver", {
      TypeName: "Mutation",
      FieldName: "batchDeleteBookmarks",
    })
  );
});
