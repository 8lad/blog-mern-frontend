import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer as reducer } from "./rootReducer";

const store = configureStore({
	reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
