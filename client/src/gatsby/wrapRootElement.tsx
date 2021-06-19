import React from "react";
import { WrapRootElementBrowserArgs } from "gatsby";
import { ThemeProvider } from "@material-ui/core";

import { customMuiTheme } from "../context/muiTheme";
import { AmplifyClient } from "../context/amplifyClient";
import { AppContextProvider } from "../context/appContext";

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <ThemeProvider theme={customMuiTheme}>
    <AmplifyClient>
      <AppContextProvider>{element}</AppContextProvider>
    </AmplifyClient>
  </ThemeProvider>
);
