import {createReducer} from "@reduxjs/toolkit";
import {modalPhotoRequest} from "../actions/ModalAction";


const initialState = {
  modalArray: [],
  status: ""

}


const reducer = createReducer(initialState, builder => {
  builder
    .addCase(modalPhotoRequest.pending, (state, ) => {
      state.status = "pending"
    })
    .addCase(modalPhotoRequest.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.modalArray = [...payload]
    })
    .addCase(modalPhotoRequest.rejected, (state, ) => {
      state.status = "fail"
    })
})

export default reducer
