import React from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import Header from "./components/Header/Header";
import BugCollection from "./components/BugCollection/BugCollection";
import { Provider } from "react-redux";
import Progress from "./components/Progress/Progress";

const theme = createMuiTheme();

function App({ store }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Progress />
        <Container fixed>
          <CssBaseline />
          <Header />
          <BugCollection />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
