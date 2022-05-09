import { configureStore } from "@reduxjs/toolkit";
import SideBarReducer from "./sideBar/SideBarSlice";
import CategoryReducer from "./category/CategorySlice";
import UserReducer from "./user/UserSlice";

const Store = configureStore({
  reducer: {
    sideBar: SideBarReducer,
    category: CategoryReducer,
    user: UserReducer,
  },
});

export default Store;
