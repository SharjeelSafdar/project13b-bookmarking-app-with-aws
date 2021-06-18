import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as ddb from "@aws-cdk/aws-dynamodb";

export class ServicesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bookmarksTable = new ddb.Table(this, "P13bBookmarksTable", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const gqlApi = new appsync.GraphqlApi(this, "P13bGraphQlApi", {
      name: "P13b-GraphQL-Api",
      schema: appsync.Schema.fromAsset("graphql/schema.gql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
    });

    const ddbDataSource = gqlApi.addDynamoDbDataSource(
      "P13bDynamoDbDataSource",
      bookmarksTable
    );
    bookmarksTable.grantReadWriteData(ddbDataSource);

    ddbDataSource.createResolver({
      typeName: "Query",
      fieldName: "bookmarks",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    ddbDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createBookmark",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition("id").auto(),
        appsync.Values.projecting()
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    ddbDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "editBookmark",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "UpdateItem",
          "key": {
            "id": $util.dynamodb.toDynamoDBJson($ctx.args.id)
          },
          "update": {
            "expression": "SET #oldTitle = :newTitle, #oldUrl = :newUrl",
            "expressionNames": {
              "#oldTitle": "title",
              "#oldUrl": "url"
            },
            "expressionValues": {
              ":newTitle": $util.dynamodb.toDynamoDBJson($ctx.args.title),
              ":newUrl": $util.dynamodb.toDynamoDBJson($ctx.args.url)
            }
          }
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    ddbDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteBookmark",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem(
        "id",
        "id"
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    new cdk.CfnOutput(this, "P13bGraphQLApiId", {
      value: gqlApi.apiId,
    });

    new cdk.CfnOutput(this, "P13bGraphQLApiKey", {
      value: gqlApi.apiKey || "Key not found or configured!",
    });

    cdk.Tags.of(this).add("Project", "P13b-Bookmarking-App-with-AWS");
  }
}
