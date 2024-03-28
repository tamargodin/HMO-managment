import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./reducers/memberSlice";
import { addMemberMiddleware,getMembers,deleteMemberMiddleWare,editUserMiddleware} from "./middleware/memberMiddleWare";
import {editCovidMiddleware} from './middleware/covidMiddleWare'


export const store =configureStore({
    reducer:{
        members: memberSlice
    },

    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware({serializableCheck: false}) ,addMemberMiddleware,getMembers,deleteMemberMiddleWare,editUserMiddleware,editCovidMiddleware]

})