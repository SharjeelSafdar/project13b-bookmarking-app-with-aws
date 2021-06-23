import React, { FC } from "react";
import Amplify from "aws-amplify";

import awsConfig from "../aws-exports";

export const AmplifyClient: FC = ({ children }) => {
  Amplify.configure(awsConfig);

  return <>{children}</>;
};
