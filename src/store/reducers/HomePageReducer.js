import {createReducer} from "@reduxjs/toolkit";
import {
  collectionRequest,
  colorSearchedImagesRequest,
  searchPhotos,
  setLoading, setModalItemData, setModalOpen,

} from "../actions/HomePageAction";
import _ from "lodash";

const initialState = {
  images: [],
  status: "",
  searchArray: [],
  collectionsData: [],
  loading: false,
  Pages: 0,
  modalOpen: false,
  modalItemData: null
}


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setModalItemData, (state, {payload}) => {
      state.modalItemData = payload
    })
    .addCase(setLoading, (state) => {
      state.loading = !state.loading
    })
    .addCase(setModalOpen, (state, {payload}) => {
      state.modalOpen = payload
    })

    .addCase(searchPhotos.pending, (state) => {
      state.status = "pending"
    })
    .addCase(searchPhotos.fulfilled, (state, action) => {
      const data = action.payload

      state.status = "ok"
      state.totalPages = data.data["total_pages"]
      state.searchArray = action.meta.arg.page > 1 ? _.uniqBy([...state.searchArray, ...data.data.results], "id") : _.uniqBy([...data.data.results], "id")

    })
    .addCase(searchPhotos.rejected, (state,) => {
      state.status = "fail"
    })

    .addCase(colorSearchedImagesRequest.pending, (state) => {
      state.status = "pending"
    })
    .addCase(colorSearchedImagesRequest.fulfilled, (state, {payload}) => {
      const {data, info} = payload
      state.status = "ok"

      if (info.page > 1) {
        state.searchArray = _.uniqBy([...state.searchArray, ...data], "id")
      } else {
        state.searchArray = _.uniqBy([...data], "id")
      }
    })
    .addCase(colorSearchedImagesRequest.rejected, (state,) => {
      state.status = "fail"
    })


    .addCase(collectionRequest.pending, (state) => {
      state.status = "pending"
    })
    .addCase(collectionRequest.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.collectionsData = [...payload]
    })
    .addCase(collectionRequest.rejected, (state) => {
      state.status = "fail"
    })

})


export default reducer


