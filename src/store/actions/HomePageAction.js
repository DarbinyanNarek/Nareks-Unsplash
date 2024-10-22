import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import api from "../../utills/Api";



export const setModalItemData = createAction(
  "homepage/setModalItemData",
  (payload) => ({
    payload,
  })
)


export const setModalOpen = createAction(
  "homepage/setOpenModal",
  (payload) => ({
    payload,
  })
)
export const setLoading = createAction(
  "homepage/setLoading",
  (payload) => ({
    payload,
  }))

export const searchPhotos = createAsyncThunk(
  "homepage/searchPhotos",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.searchPhoto(payload)
      return {data, info: payload}
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response)
    }
  }
)




export const collectionRequest = createAsyncThunk(
  "homepage/collectionRequest",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getCollection(payload)
      return  data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response)
    }
  }
)


export const colorSearchedImagesRequest = createAsyncThunk(
  "homepage/colorSearchedImages",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getColor(payload)
      return {data: data.results, info: payload}
    }catch (err){
      return thunkAPI.rejectWithValue(err.response)
    }
  }
  )














