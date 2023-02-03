import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_COMMENTS } from "../../constants";
import { commentData, requestStatuses } from "../reduxTypes";

interface InitialState {
	comments: commentData[];
	commentsStatus: requestStatuses;
}

const initialState: InitialState = {
	comments: [],
	commentsStatus: "loading",
};

export const fetchComments = createAsyncThunk(
	"comments/fetchComments",
	async () => {
		try {
			const { data } = await axios.get(APP_ROUTE_COMMENTS);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const fetchSingleCommentData = createAsyncThunk(
	"comments/fetchSingleCommentData",
	async (commentData: commentData) => {
		try {
			const { data } = await axios.post(APP_ROUTE_COMMENTS, commentData);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchComments.pending, (state) => {
			state.comments = [];
			state.commentsStatus = "loading";
		});
		builder.addCase(
			fetchComments.fulfilled,
			(state, action: PayloadAction<commentData[]>) => {
				state.comments = action.payload;
				state.commentsStatus = "loaded";
			}
		);
		builder.addCase(fetchComments.rejected, (state) => {
			state.comments = [];
			state.commentsStatus = "error";
		});
		builder.addCase(fetchSingleCommentData.pending, (state) => {
			state.commentsStatus = "loading";
		});
		builder.addCase(
			fetchSingleCommentData.fulfilled,
			(state, action: PayloadAction<commentData[]>) => {
				state.comments = action.payload;
				state.commentsStatus = "loaded";
			}
		);
		builder.addCase(fetchSingleCommentData.rejected, (state) => {
			state.commentsStatus = "error";
		});
	},
});

export const commentsReducer = commentsSlice.reducer;
