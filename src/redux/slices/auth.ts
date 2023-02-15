import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import {
	APP_ROUTE_AUTH,
	APP_ROUTE_LOGIN,
	APP_ROUTE_ME,
	APP_ROUTE_REGISTER,
	APP_ROUTE_UPLOAD_AVATAR,
} from "../../constants";
import { RequestStatuses, UserDataInterface } from "../reduxTypes";
import { RootState } from "../store";

interface InitialState {
	data: UserDataInterface;
	authStatus: RequestStatuses;
	errorMessage?: string;
}

export interface userAuthInputData {
	email: string;
	passwordHash: string;
	avatarUrl?: string;
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
	errorMessage: "",
};

export const fetchAuth = createAsyncThunk<
	UserDataInterface,
	userAuthInputData,
	{ rejectValue: string }
>("auth/fetchAuth", async (params, thunkApi) => {
	try {
		const { data } = await axios.post(
			`${APP_ROUTE_AUTH}${APP_ROUTE_LOGIN}`,
			params
		);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

export const fetchAvatarUrl = createAsyncThunk<
	string,
	FormData,
	{ rejectValue: string }
>("auth/fetchAvatarUrl", async (formData, thunkApi) => {
	try {
		const { data } = await axios.post(APP_ROUTE_UPLOAD_AVATAR, formData);
		return data.url;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
	const { data } = await axios.get(`${APP_ROUTE_AUTH}${APP_ROUTE_ME}`);
	return data;
});

export const fetchRegister = createAsyncThunk<
	UserDataInterface,
	userSingInData,
	{ rejectValue: string }
>("auth/fetchRegister", async (params, thunkApi) => {
	try {
		const { data } = await axios.post(
			`${APP_ROUTE_AUTH}${APP_ROUTE_REGISTER}`,
			params
		);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = initialState.data;
		},
		removeAvatarImage: (state) => {
			state.data.avatarUrl = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuth.pending, (state) => {
			state.data = initialState.data;
			state.authStatus = "loading";
			state.errorMessage = "";
		});
		builder.addCase(
			fetchAuth.fulfilled,
			(state, action: PayloadAction<UserDataInterface>) => {
				state.data = action.payload;
				state.authStatus = "loaded";
				state.errorMessage = "";
			}
		);
		builder.addCase(
			fetchAuth.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.data = initialState.data;
				state.authStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
		builder.addCase(fetchAuthMe.pending, (state) => {
			state.data = initialState.data;
			state.authStatus = "loading";
			state.errorMessage = "";
		});
		builder.addCase(
			fetchAuthMe.fulfilled,
			(state, action: PayloadAction<UserDataInterface>) => {
				state.data = action.payload;
				state.authStatus = "loaded";
				state.errorMessage = "";
			}
		);
		builder.addCase(
			fetchAuthMe.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.data = initialState.data;
				state.authStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
		builder.addCase(fetchRegister.pending, (state) => {
			state.authStatus = "loading";
			state.errorMessage = "";
		});
		builder.addCase(
			fetchRegister.fulfilled,
			(state, action: PayloadAction<UserDataInterface>) => {
				state.data = action.payload;
				state.authStatus = "loaded";
				state.errorMessage = "";
			}
		);
		builder.addCase(
			fetchRegister.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.data = initialState.data;
				state.authStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
		builder.addCase(fetchAvatarUrl.pending, (state) => {
			state.authStatus = "loading";
			state.data.avatarUrl = "";
		});
		builder.addCase(
			fetchAvatarUrl.fulfilled,
			(state, action: PayloadAction<string>) => {
				state.authStatus = "loaded";
				state.data.avatarUrl = action.payload;
			}
		);
		builder.addCase(
			fetchAvatarUrl.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.authStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
	},
});

export const selectIsAuth = (state: RootState) =>
	Boolean(state.auth.data._id) &&
	Boolean(state.auth.data.fullName) &&
	Boolean(state.auth.data.email);

export const authReducer = authSlice.reducer;
export const { logout, removeAvatarImage } = authSlice.actions;
