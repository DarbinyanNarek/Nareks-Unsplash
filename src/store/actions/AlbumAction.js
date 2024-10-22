import { createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";



export const albumRequest = createAsyncThunk(

  "album/albumRequest",

  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getAlbums(payload)
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response)
    }
  }
)

export const albumUserRequest = createAsyncThunk(
  "album/albumUserRequest",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getAlbumUser(payload)
      return data
    }catch (err){
      return thunkAPI.rejectWithValue(err.response)
    }
  }
)

