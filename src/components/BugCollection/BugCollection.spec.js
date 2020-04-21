import React from "react";
import { render, fireEvent } from "@testing-library/react";
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

  function renderBugCollectionComponent() {
    return render(
      <Provider store={store}>
        <BugCollection />
      </Provider>
    );
  }

  describe("Elements", () => {
    it("renders the add bug form", async () => {
      const sut = renderBugCollectionComponent();

      const form = sut.getByTestId("add-bug-form");

      expect(form).not.toBe(null);
    });
  });

  describe("Loads the bugs", () => {
    it("renders 'No bugs', if none", () => {
      const sut = renderBugCollectionComponent();

      const noBugsMessage = sut.queryByTestId("no-bugs");

      expect(noBugsMessage).toBeInTheDocument();
    });

    it("renders the bugs, if any", async () => {
      await store.dispatch(bugs.actions.add("X"));
      await store.dispatch(bugs.actions.add("Y"));
      await store.dispatch(bugs.actions.add("Z"));

      const sut = renderBugCollectionComponent();

      const bugListItems = sut.queryAllByTestId("edit-bug-form");
      expect(bugListItems).toHaveLength(3);
    });
  });

  describe("Adds bugs", () => {
    it("adds the bug, if validation passes", () => {
      const sut = renderBugCollectionComponent();

      const input = sut.getByTestId("add-bug-input");
      fireEvent.change(input, { target: { value: "New bug!" } });
      fireEvent.keyPress(input, { charCode: 13 });
      const bugListItems = sut.queryAllByTestId("edit-bug-form");

      expect(bugListItems).toHaveLength(1);
    });

    it("does not add the bug, if validation fails", () => {});

    it("does not add the bug, if error", () => {});
  });
});
