import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const modalPhotoRequest = createAsyncThunk(
  "modal/modalPhotoRequest",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getModalPhotos(payload)
      return data
    }catch (err){
      return thunkAPI.rejectWithValue(err.response)
    }
  }
)
