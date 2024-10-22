import {createReducer} from "@reduxjs/toolkit";
import {albumPhotoRequest,} from "../actions/AlbumPhotoAction";
import _ from "lodash";

const initialState = {
  albumsPhotos: [],
  status: "",
}


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(albumPhotoRequest.pending, (state,) => {
      state.status = "pending"
    })
    .addCase(albumPhotoRequest.fulfilled, (state, {payload}) => {
      state.status = "ok"
      if (payload.page === 1) {
        state.albumsPhotos = _.uniqBy([...payload.data], "id")
      }
      else {
        state.albumsPhotos = _.uniqBy([...state.albumsPhotos, ...payload.data], "id")
      }
    })
    .addCase(albumPhotoRequest.rejected, (state,) => {
      state.status = "fail"
    })


})


export default reducer
