import {createReducer} from "@reduxjs/toolkit";
import {loginIntoPage} from "../actions/LoginAction";


const initialState = {
  token: "",
  status: ""
}


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginIntoPage.pending, (state) => {
      state.status = "pending"
    })
    .addCase(loginIntoPage.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.token = payload
      localStorage.setItem("token", payload)
    })
    .addCase(loginIntoPage.rejected, (state) => {
      state.status = "fail"
    })

})


export default reducer
