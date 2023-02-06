import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_POSTS, APP_ROUTE_UPLOAD } from "../../constants";
import { baseSinglePost, requestStatuses, singlePost } from "../reduxTypes";
import { RootState } from "../store";

interface InitialState {
	singlePostStatus: requestStatuses;
	post: singlePost;
	errorMessage: string;
}

const initialState: InitialState = {
	singlePostStatus: "loading",
	errorMessage: "",
	post: {
		_id: "",
		title: "",
		text: "",
		tags: [],
		viewsCount: 0,
		imageUrl: "",
		user: {
			email: "",
			avatarUrl: "",
			_id: "",
			fullName: "",
		},
		createdAt: "",
		updatedAt: "",
		__v: 0,
	},
};

export const fetchSinglePost = createAsyncThunk<
	singlePost,
	string,
	{ rejectValue: string }
>("singlePost/fetchSinglePost", async (id, thunkApi) => {
	try {
		const { data } = await axios.get(`${APP_ROUTE_POSTS}/${id}`);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

export const fetchSinglePostData = createAsyncThunk<
	void,
	baseSinglePost,
	{ rejectValue: string }
>("singlePost/fetchSinglePostData", async (postData, thunkApi) => {
	try {
		const { data } = postData._id
			? await axios.patch(`${APP_ROUTE_POSTS}/${postData._id}`, postData)
			: await axios.post(APP_ROUTE_POSTS, postData);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

export const fetchImageUrl = createAsyncThunk<
	string,
	FormData,
	{ rejectValue: string }
>("singlePost/fetchImageUrl", async (formData, thunkApi) => {
	try {
		const { data } = await axios.post(APP_ROUTE_UPLOAD, formData);
		return data.url;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

const singlePost = createSlice({
	name: "singlePost",
	initialState,
	reducers: {
		setText: (state, action) => {
			state.post.text = action.payload;
			state.singlePostStatus = "loaded";
		},
		setTitle: (state, action) => {
			state.post.title = action.payload;
			state.singlePostStatus = "loaded";
		},
		setTags: (state, action) => {
			state.post.tags = action.payload;
			state.singlePostStatus = "loaded";
		},
		removeImageUrl: (state) => {
			state.post.imageUrl = "";
			state.singlePostStatus = "loaded";
		},
		removeSinglePost: (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "loaded";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSinglePost.pending, (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "loading";
			state.errorMessage = "";
		});
		builder.addCase(
			fetchSinglePost.fulfilled,
			(state, action: PayloadAction<singlePost>) => {
				state.post = action.payload;
				state.singlePostStatus = "loaded";
				state.errorMessage = "";
			}
		);
		builder.addCase(
			fetchSinglePost.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.post = { ...initialState.post };
				state.singlePostStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
		builder.addCase(fetchSinglePostData.pending, (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "loading";
			state.errorMessage = "";
		});
		builder.addCase(fetchSinglePostData.fulfilled, (state) => {
			state.singlePostStatus = "loaded";
			state.errorMessage = "";
		});
		builder.addCase(
			fetchSinglePostData.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.post = { ...initialState.post };
				state.singlePostStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
		builder.addCase(fetchImageUrl.pending, (state) => {
			state.post.imageUrl = "";
			state.singlePostStatus = "loading";
			state.errorMessage = "";
		});
		builder.addCase(fetchImageUrl.fulfilled, (state, action) => {
			state.post.imageUrl = action.payload;
			state.singlePostStatus = "loaded";
			state.errorMessage = "";
		});
		builder.addCase(
			fetchImageUrl.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.post.imageUrl = "";
				state.singlePostStatus = "error";
				state.errorMessage = action.payload as string;
			}
		);
	},
});

export const isReadyToSend = ({
	singlePost: {
		post: { text, title, tags },
	},
}: RootState) => Boolean(text && title && tags.length);
export const singlePostReducer = singlePost.reducer;
export const { setText, setTitle, setTags, removeImageUrl, removeSinglePost } =
	singlePost.actions;
