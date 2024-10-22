import {createReducer} from "@reduxjs/toolkit";


import {albumUserRequest, albumRequest} from "../actions/AlbumAction";

const initialState = {
  albumData: [],
  albumUser: [],
  status: ""
}


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(albumRequest.pending, (state) => {
      state.status = "pending"
    })
    .addCase(albumRequest.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.albumData = payload
    })
    .addCase(albumRequest.rejected, (state) => {
      state.status = "fail"
    })
    .addCase(albumUserRequest.pending, (state) => {
      state.status = "pending"
    })
    .addCase(albumUserRequest.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.albumUser = payload

    })
    .addCase(albumUserRequest.rejected, (state) => {
      state.status = "fail"
    })

})


export default reducer
