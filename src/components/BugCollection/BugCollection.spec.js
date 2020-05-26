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
  beforeAll(() => {
    server = makeServer();
  });
  afterAll(() => {
    if (server) {
      server.shutdown();
    }
  });

  beforeEach(() => {
    store = configureStore();
    server.db.bugs = [];
    server.throwApiError = false;
  });
  afterEach(() => {});

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
    it("adds the bug, if validation passes", async () => {
      const sut = renderBugCollectionComponent();

      const input = sut.getByTestId("add-bug-input");
      fireEvent.change(input, { target: { value: "New bug!" } });
      fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

      const bugListItems = await sut.findAllByTestId("edit-bug-form");
      expect(bugListItems).toHaveLength(1);
    });

    it("does not add the bug, if error", async () => {
      const sut = renderBugCollectionComponent();
      server.throwApiError = true;

      const input = sut.getByTestId("add-bug-input");
      fireEvent.change(input, { target: { value: "Faulty bug" } });
      fireEvent.keyPress(input, { code: 13, charCode: 13 });

      const noBugsMessage = await sut.findByTestId("no-bugs");

      expect(noBugsMessage).toBeInTheDocument();
    });
  });
});
