import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import Header from "./components/Header/Header";
import BugCollection from "./components/BugCollection/BugCollection";
import { Provider } from "react-redux";

function App({ store }) {
  return (
    <Provider store={store}>
      <Container fixed>
        <CssBaseline />
        <Header />
        <BugCollection />
      </Container>
    </Provider>
  );
}

export default App;
