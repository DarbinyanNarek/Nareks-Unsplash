import { createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const albumPhotoRequest = createAsyncThunk(
  "albumPhoto/albumPhotoRequest",

  async (payload, thunkApi) => {
    try {
      const {data} = await api.getAlbumPhotos(payload)
      return {data, page: payload.page};
    } catch (err) {
      return thunkApi.rejectWithValue(err.response)
    }
  }
)
