import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_COMMENTS } from "../../constants";

const initialState = {
	comments: [],
	status: "loading"
};

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
	try {
		const { data } = await axios.get(APP_ROUTE_COMMENTS);
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchSingleCommentData = createAsyncThunk("comments/fetchSingleCommentData", async (data) => {
	try {
		await axios.post(APP_ROUTE_COMMENTS, data);
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
			state.status = "loading";
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.comments = action.payload;
			state.status = "loaded";
		},
		[fetchComments.rejected]: (state) => {
			state.comments = [];
			state.status = "error";
		},
		[fetchSingleCommentData.pending]: (state) => {
			state.status = "loading";
		},
		[fetchSingleCommentData.fulfilled]: (state) => {
			state.status = "loaded";
		},
		[fetchSingleCommentData.rejected]: (state) => {
			state.status = "error";
		}
	}
});

export const commentsReducer = commentsSlice.reducer;
