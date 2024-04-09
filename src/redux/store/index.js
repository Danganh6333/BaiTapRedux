import { configureStore } from "@reduxjs/toolkit";
import chiTieuReducer from "../reducer/ChiTieuReducer";

export default configureStore({
    reducer:{
        listChiTieu:chiTieuReducer
    }
})