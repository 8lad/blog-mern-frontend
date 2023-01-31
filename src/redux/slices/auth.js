import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios";
import {
	APP_ROUTE_AUTH,
	APP_ROUTE_LOGIN,
	APP_ROUTE_ME,
	APP_ROUTE_REGISTER,
} from "../../constants";

const initialState = {
	data: {
		_id: "",
		fullName: "",
		email: "",
		avatarUrl: "",
	},
	authStatus: "loading",
};

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
	const { data } = await axios.post(
		`${APP_ROUTE_AUTH}${APP_ROUTE_LOGIN}`,
		params
	);
	return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
	const { data } = await axios.get(`${APP_ROUTE_AUTH}${APP_ROUTE_ME}`);
	return data;
});

export const fetchRegister = createAsyncThunk(
	"auth/fetchRegister",
	async (params) => {
		const { data } = await axios.post(
			`${APP_ROUTE_AUTH}${APP_ROUTE_REGISTER}`,
			params
		);
		return data;
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		},
	},
	extraReducers: {
		[fetchAuth.pending]: (state) => {
			state.data = null;
			state.authStatus = "loading";
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.authStatus = "loaded";
		},
		[fetchAuth.rejected]: (state) => {
			state.data = null;
			state.authStatus = "error";
		},
		[fetchAuthMe.pending]: (state) => {
			state.data = null;
			state.authStatus = "loading";
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.authStatus = "loaded";
		},
		[fetchAuthMe.rejected]: (state) => {
			state.data = null;
			state.authStatus = "error";
		},
		[fetchRegister.pending]: (state) => {
			state.authStatus = "loading";
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.authStatus = "loaded";
		},
		[fetchRegister.rejected]: (state) => {
			state.data = null;
			state.authStatus = "error";
		},
	},
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
