import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_COMMENTS } from "../../constants";

const initialState = {
	comments: [],
	commentsStatus: "loading"
};

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
	try {
		const { data } = await axios.get(APP_ROUTE_COMMENTS);
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchSingleCommentData = createAsyncThunk("comments/fetchSingleCommentData", async (commentData) => {
	try {
		const { data } = await axios.post(APP_ROUTE_COMMENTS, commentData);
		return data;
	} catch (error) {
		console.log(error);
	}
});

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchComments.pending]: (state) => {
			state.comments = [];
			state.commentsStatus = "loading";
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.comments = action.payload;
			state.commentsStatus = "loaded";
		},
		[fetchComments.rejected]: (state) => {
			state.comments = [];
			state.commentsStatus = "error";
		},
		[fetchSingleCommentData.pending]: (state) => {
			state.commentsStatus = "loading";
		},
		[fetchSingleCommentData.fulfilled]: (state, action) => {
			state.comments = action.payload;
			state.commentsStatus = "loaded";
		},
		[fetchSingleCommentData.rejected]: (state) => {
			state.commentsStatus = "error";
		}
	}
});

export const commentsReducer = commentsSlice.reducer;
