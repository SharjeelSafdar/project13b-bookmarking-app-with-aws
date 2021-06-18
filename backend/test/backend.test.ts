import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as P13bBackendServices from "../lib/backend-services-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new P13bBackendServices.ServicesStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
