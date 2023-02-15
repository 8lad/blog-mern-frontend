import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_COMMENTS } from "../../constants";
import { CommentData, RequestStatuses } from "../reduxTypes";

interface InitialState {
	comments: CommentData[];
	commentsStatus: RequestStatuses;
	errorMessage: string;
}

const initialState: InitialState = {
	comments: [],
	commentsStatus: "loading",
	errorMessage: "",
};

export const fetchComments = createAsyncThunk<
	CommentData[],
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
	CommentData[],
	CommentData,
	{ rejectValue: string }
>("comments/fetchSingleCommentData", async (CommentData, thunkApi) => {
	try {
		const { data } = await axios.post(APP_ROUTE_COMMENTS, CommentData);
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
			(state, action: PayloadAction<CommentData[]>) => {
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
			(state, action: PayloadAction<CommentData[]>) => {
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
