import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import Header from "./components/Header/Header";

function App() {
  return (
    <Container fixed>
      <CssBaseline />
      <Header />
    </Container>
  );
}

export default App;
