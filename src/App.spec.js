import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import makeServer from "./store/tests/server";
import configureStore from "./store/configureStore";
import bugs from "./store/bugs";

describe("Loading the app", () => {
  let store = null;
  let server = null;
  beforeEach(() => {
    store = configureStore();
    server = makeServer();
  });

  afterEach(() => {
    if (server) {
      server.shutdown();
    }
  });

  it("renders Buggy title", () => {
    const { getByText } = render(<App store={store} />);

    const titleElement = getByText(/Buggy/i);
    expect(titleElement).toBeInTheDocument();
  });
});
