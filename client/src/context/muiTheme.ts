import { createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

export const customMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: purple[800],
    },
  },
});
