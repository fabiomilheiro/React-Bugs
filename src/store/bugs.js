import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import api from "./api";

const slice = createSlice({
  initialState: {
    list: [],
    isLoading: false,
  },
  name: "bugs",
  reducers: {
    loadStarted: (bugs) => {
      bugs.isLoading = true;
    },

    loadSucceeded: (bugs, { payload }) => {
      bugs.list = payload;
      bugs.isLoading = false;
    },

    loadFailed: (bugs) => {
      bugs.isLoading = false;
    },

    addStarted: (bugs) => {
      bugs.isLoading = true;
    },

    addSucceeded: (bugs, { payload }) => {
      payload.resolved = payload.resolved || false;
      bugs.list.push(payload);
      bugs.isLoading = false;
    },

    addFailed: (bugs) => {
      bugs.isLoading = false;
    },

    descriptionChanged: (bugs, { payload }) => {
      const bug = getBug(bugs, payload.id);
      bug.description = payload.description;
    },

    updateStarted: (bugs) => {
      bugs.isLoading = true;
    },

    updateSucceeded: (bugs, { payload }) => {
      bugs.isLoading = false;
      const index = bugs.list.findIndex((b) => b.id === payload.id);

      bugs.list[index] = payload;
    },

    updateFailed: (bugs) => {
      bugs.isLoading = false;
    },

    removeStarted: (bugs) => {
      bugs.isLoading = true;
    },

    removeSucceeded: (bugs, { payload }) => {
      bugs.isLoading = false;
      bugs.list = bugs.list.filter((b) => b.id !== payload.id);
    },

    removeFailed: (bugs) => {
      bugs.isLoading = false;
    },

    resolveStarted: (bugs) => {
      bugs.isLoading = true;
      console.log("bugs: ", bugs);
    },
    resolveSucceeded: (bugs, payload) => {
      bugs.isLoading = false;
      const bug = getBug(bugs, payload.id);
      bug.resolved = payload.resolved;
      console.log("bugs: ", bugs);
    },
    resolveFailed: (bugs) => (bugs.isLoading = false),

    assigned: (bugs, { payload }) => {
      const bug = getBug(bugs, payload.id);
      bug.userId = payload.userId;
    },
  },
});

function getBug(bugs, id) {
  return bugs.list.find((b) => b.id === id);
}

const selectors = {
  getUnresolvedBugs: createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((b) => !b.resolved)
  ),
  getBugsByUser: (userId) =>
    createSelector(
      (state) => state.entities.bugs,
      (bugs) => bugs.list.filter((b) => b.userId === userId)
    ),
};

const actions = {
  load: () => (dispatch, getState) => {
    return dispatch(
      api.actions.requestStarted({
        url: "/bugs",
        onStart: slice.actions.loadStarted.type,
        onSuccess: slice.actions.loadSucceeded.type,
        onError: slice.actions.loadFailed.type,
      })
    );
  },

  add: (description) =>
    api.actions.requestStarted({
      url: "/bugs",
      method: "post",
      data: { description },
      onStart: slice.actions.addStarted.type,
      onSuccess: slice.actions.addSucceeded.type,
      onError: slice.actions.addFailed.type,
    }),

  changeDescription: (data) => {
    return slice.actions.descriptionChanged(data);
  },

  save: (data) =>
    api.actions.requestStarted({
      url: `/bugs/${data.id}`,
      method: "patch",
      data: data,
      onStart: slice.actions.updateStarted.type,
      onSuccess: slice.actions.updateSucceeded.type,
      onError: slice.actions.updateFailed.type,
    }),

  assign: (id, userId) =>
    api.actions.requestStarted({
      url: `/bugs/${id}`,
      method: "patch",
      data: { userId },
      onSuccess: slice.actions.assigned.type,
    }),

  resolve: (id) =>
    api.actions.requestStarted({
      url: `/bugs/${id}`,
      method: "patch",
      data: { resolved: true },
      onStart: slice.actions.resolveStarted.type,
      onSuccess: slice.actions.resolveSucceeded.type,
      onError: slice.actions.resolveFailed.type,
    }),

  remove: (id) =>
    api.actions.requestStarted({
      url: `/bugs/${id}`,
      method: "patch",
      data: { removed: true },
      onStart: slice.actions.removeStarted.type,
      onSuccess: slice.actions.removeSucceeded.type,
      onError: slice.actions.removeFailed.type,
    }),
};

export default {
  actions,
  reducer: slice.reducer,
  selectors,
};
