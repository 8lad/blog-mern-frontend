import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_COMMENTS } from "../../constants";
import { commentData, requestStatuses } from "../reduxTypes";

interface InitialState {
	comments: commentData[];
	commentsStatus: requestStatuses;
	errorMessage: string;
}

const initialState: InitialState = {
	comments: [],
	commentsStatus: "loading",
	errorMessage: "",
};

export const fetchComments = createAsyncThunk<
	commentData[],
	void,
	{ rejectValue: string }
>("comments/fetchComments", async (_, thunkApi) => {
	try {
		const { data } = await axios.get(APP_ROUTE_COMMENTS);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

export const fetchSingleCommentData = createAsyncThunk<
	commentData[],
	commentData,
	{ rejectValue: string }
>("comments/fetchSingleCommentData", async (commentData, thunkApi) => {
	try {
		const { data } = await axios.post(APP_ROUTE_COMMENTS, commentData);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchComments.pending, (state) => {
			state.comments = [];
			state.commentsStatus = "loading";
			state.errorMessage = "";
		});
		builder.addCase(
			fetchComments.fulfilled,
			(state, action: PayloadAction<commentData[]>) => {
				state.comments = action.payload;
				state.commentsStatus = "loaded";
				state.errorMessage = "";
			}
		);
		builder.addCase(
			fetchComments.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.comments = [];
				state.commentsStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
		builder.addCase(fetchSingleCommentData.pending, (state) => {
			state.comments = [];
			state.commentsStatus = "loading";
			state.errorMessage = "";
		});
		builder.addCase(
			fetchSingleCommentData.fulfilled,
			(state, action: PayloadAction<commentData[]>) => {
				state.comments = action.payload;
				state.commentsStatus = "loaded";
				state.errorMessage = "";
			}
		);
		builder.addCase(
			fetchSingleCommentData.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.comments = [];
				state.commentsStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
	},
});

export const commentsReducer = commentsSlice.reducer;
