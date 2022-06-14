import { createSlice } from "@reduxjs/toolkit";
import { IInfoMessage } from "../../interfaces/IInfoMessage";
import { IPatch } from "../../interfaces/IPath";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isHamburgerActive: false,
    isDeleteModalActive: false,
    infoMessages: [] as Array<IInfoMessage>,
    isFormContainerActive: false,
    pathes: [{
      title: 'Pet Shop',
      route: '/'
    }] as Array<IPatch>
  },
  reducers: {
    toggleHamburgerMenu(state) {
      state.isHamburgerActive = !state.isHamburgerActive;
    },
    toggleDeleteModal(state) {
      state.isDeleteModalActive = !state.isDeleteModalActive;
    },
    addInfoMessage(state, action) {
      const { payload } = action.payload;
      state.infoMessages.push(payload);
    },
    removeInfoMessage(state, action) {
      const { payload } = action.payload;
      state.infoMessages.splice(payload, 1);
    },
    toggleFormContainer(state) {
      state.isFormContainerActive = !state.isFormContainerActive;
    },
    resetPath(state) {
      state.pathes = [{
        title: 'Pet Shop',
        route: '/'
      }];
    },
    addToPath(state, action) {
      action.payload.map((path: IPatch) => state.pathes.push(path))
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;