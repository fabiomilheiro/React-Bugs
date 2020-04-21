import React from "react";
import { render } from "@testing-library/react";
import BugCollection from "./BugCollection";
import bugs from "../../store/bugs";
import configureStore from "../../store/configureStore";
import makeServer from "../../store/tests/server";
import { Provider } from "react-redux";

describe("Bug collection", () => {
  let store;
  let server;
  beforeEach(() => {
    store = configureStore();
    server = makeServer();
  });

  afterEach(() => {
    if (server) {
      server.shutdown();
    }
  });

  function createBugCollectionComponent() {
    return (
      <Provider store={store}>
        <BugCollection />
      </Provider>
    );
  }

  describe("Elements", () => {
    it("renders the add button", async () => {
      const app = render(createBugCollectionComponent());

      const addBugButton = app.getByTestId("add-bug");

      expect(addBugButton).not.toBe(null);
    });
  });

  describe("Loads the bugs", () => {
    it("renders 'No bugs', if none", () => {
      const app = render(createBugCollectionComponent());

      const noBugsMessage = app.queryByTestId("no-bugs");

      expect(noBugsMessage).toBeInTheDocument();
    });

    it("renders the bugs, if any", async () => {
      await store.dispatch(bugs.actions.add("x"));
      await store.dispatch(bugs.actions.add("x"));
      await store.dispatch(bugs.actions.add("x"));

      const app = render(createBugCollectionComponent());

      const bugListItems = app.queryAllByTestId("bug-list-item");
      expect(bugListItems).toHaveLength(3);
    });
  });
});
