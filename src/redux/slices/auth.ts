import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import {
	APP_ROUTE_AUTH,
	APP_ROUTE_LOGIN,
	APP_ROUTE_ME,
	APP_ROUTE_REGISTER,
} from "../../constants";
import { requestStatuses, userDataInterface } from "../reduxTypes";
import { RootState } from "../store";

interface InitialState {
	data: userDataInterface;
	authStatus: requestStatuses;
}

export interface userAuthInputData {
	email: string;
	passwordHash: string;
}

export interface userSingInData extends userAuthInputData {
	fullName: string;
}

const initialState: InitialState = {
	data: {
		_id: "",
		fullName: "",
		email: "",
		avatarUrl: "",
	},
	authStatus: "loading",
};

export const fetchAuth = createAsyncThunk(
	"auth/fetchAuth",
	async (params: userAuthInputData) => {
		const { data } = await axios.post(
			`${APP_ROUTE_AUTH}${APP_ROUTE_LOGIN}`,
			params
		);
		return data;
	}
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
	const { data } = await axios.get(`${APP_ROUTE_AUTH}${APP_ROUTE_ME}`);
	return data;
});

export const fetchRegister = createAsyncThunk(
	"auth/fetchRegister",
	async (params: userSingInData) => {
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
			state.data = initialState.data;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuth.pending, (state) => {
			state.data = initialState.data;
			state.authStatus = "loading";
		});
		builder.addCase(
			fetchAuth.fulfilled,
			(state, action: PayloadAction<userDataInterface>) => {
				state.data = action.payload;
				state.authStatus = "loaded";
			}
		);
		builder.addCase(fetchAuth.rejected, (state) => {
			state.data = initialState.data;
			state.authStatus = "error";
		});
		builder.addCase(fetchAuthMe.pending, (state) => {
			state.data = initialState.data;
			state.authStatus = "loading";
		});
		builder.addCase(
			fetchAuthMe.fulfilled,
			(state, action: PayloadAction<userDataInterface>) => {
				state.data = action.payload;
				state.authStatus = "loaded";
			}
		);
		builder.addCase(fetchAuthMe.rejected, (state) => {
			state.data = initialState.data;
			state.authStatus = "error";
		});
		builder.addCase(fetchRegister.pending, (state) => {
			state.authStatus = "loading";
		});
		builder.addCase(
			fetchRegister.fulfilled,
			(state, action: PayloadAction<userDataInterface>) => {
				state.data = action.payload;
				state.authStatus = "loaded";
			}
		);
		builder.addCase(fetchRegister.rejected, (state) => {
			state.data = initialState.data;
			state.authStatus = "error";
		});
	},
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
