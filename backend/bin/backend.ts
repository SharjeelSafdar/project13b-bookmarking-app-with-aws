#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ServicesStack } from "../lib/backend-services-stack";

const app = new cdk.App();
new ServicesStack(app, "P13bBackendServicesStack");
