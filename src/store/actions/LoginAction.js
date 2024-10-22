import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";





export const loginIntoPage = createAsyncThunk(
  "loginPage/loginIntoPage",
  async (loginInfo) => {
    try {
      const {data} = await axios.post("https://dummyjson.com/auth/login", loginInfo)
      return data.accessToken
    } catch (err) {
      console.log(err)
    }
  }
)
