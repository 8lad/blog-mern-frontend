import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";

import { errorHandlingMiddleware } from "../middlewares/errorHandlingMiddleware.";

import { rootReducer as reducer } from "./rootReducer";

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => [
		errorHandlingMiddleware,
		...getDefaultMiddleware(),
	],
});

export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
