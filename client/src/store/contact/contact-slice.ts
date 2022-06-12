import { createSlice } from "@reduxjs/toolkit";
import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS } from "../../constants/contact";
import { IContact, ISelectedContact } from "../../interfaces/IContact";

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contact: {
      loading: false,
      error: null,
      data: [] as Array<IContact>
    },
    selectedContact: {} as ISelectedContact
  },
  reducers: {
    create(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case CONTACT_REQUEST:
          state.contact.loading = true;
          state.contact.error = null;
          break;
        case CONTACT_SUCCESS:
          state.contact.loading = false;
          state.contact.error = null;
          state.contact.data.push(payload);
          break;
        case CONTACT_FAIL:
          state.contact.loading = false;
          state.contact.error = payload;
          break;
      }
    },
    get(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case CONTACT_REQUEST:
          state.contact.loading = true;
          state.contact.error = null;
          break;
        case CONTACT_SUCCESS:
          state.contact.loading = false;
          state.contact.error = null;
          state.contact.data = payload;
          break;
        case CONTACT_FAIL:
          state.contact.loading = false;
          state.contact.error = payload;
          break;
      }
    },
    edit(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case CONTACT_REQUEST:
          state.contact.loading = true;
          state.contact.error = null;
          break;
        case CONTACT_SUCCESS:
          state.contact.loading = false;
          state.contact.error = null;
          state.contact.data[index] = payload;
          break;
        case CONTACT_FAIL:
          state.contact.loading = false;
          state.contact.error = payload;
          break;
      }
    },
    delete(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case CONTACT_REQUEST:
          state.contact.loading = true;
          state.contact.error = null;
          break;
        case CONTACT_SUCCESS:
          state.contact.loading = false;
          state.contact.error = null;
          state.contact.data.splice(index ,1);;
          break;
        case CONTACT_FAIL:
          state.contact.loading = false;
          state.contact.error = payload;
          break;
      }
    },
    select(state, action) {
      const {_id, index} = action.payload;
      state.selectedContact = {
        _id,
        index
      };
    }
  }
});

export const contactActions = contactSlice.actions;
export default contactSlice;