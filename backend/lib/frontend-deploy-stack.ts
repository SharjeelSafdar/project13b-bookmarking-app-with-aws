import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudFront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";

export class FrontendDeployStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a bucket to upload the Gatsby static web app
    // We will deploy our static site through GitHub Actions into this bucket.
    const p13bBucketForFrontendAssets = new s3.Bucket(
      this,
      "P13bBucketForFrontendAssets",
      {
        bucketName: "p13b-bucket-for-frontend-assets",
        versioned: true,
        autoDeleteObjects: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        websiteIndexDocument: "index.html",
        publicReadAccess: true,
      }
    );

    // Create a CDN to deploy the website
    const p13bDistribution = new cloudFront.Distribution(
      this,
      "P13bFrontendDist",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(p13bBucketForFrontendAssets),
        },
        defaultRootObject: "index.html",
      }
    );

    // Uploading the static site in bucket
    new s3Deploy.BucketDeployment(this, "DeployWesite", {
      sources: [s3Deploy.Source.asset("../client/public")],
      destinationBucket: p13bBucketForFrontendAssets,
      distribution: p13bDistribution,
      distributionPaths: ["/*"],
    });

    // Prints out the web endpoint to the terminal
    new cdk.CfnOutput(this, "P13bDistributionDomainName", {
      value: p13bDistribution.domainName,
    });

    cdk.Tags.of(this).add("Project", "P13b-Bookmarking-App-with-AWS");
  }
}
