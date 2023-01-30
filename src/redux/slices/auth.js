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
	status: "loading",
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
			state.status = "loading";
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "loaded";
		},
		[fetchAuth.rejected]: (state) => {
			state.data = null;
			state.status = "error";
		},
		[fetchAuthMe.pending]: (state) => {
			state.data = null;
			state.status = "loading";
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "loaded";
		},
		[fetchAuthMe.rejected]: (state) => {
			state.data = null;
			state.status = "error";
		},
		[fetchRegister.pending]: (state) => {
			state.status = "loading";
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "loaded";
		},
		[fetchRegister.rejected]: (state) => {
			state.data = null;
			state.status = "error";
		},
	},
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
