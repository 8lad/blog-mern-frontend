import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
	errorMessage: string;
}

const initialState: InitialState = {
	errorMessage: "",
};

const errorSlice = createSlice({
	name: "errors",
	initialState,
	reducers: {
		setErrorMessage: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		},
	},
});

export const errorReducer = errorSlice.reducer;
export const { setErrorMessage } = errorSlice.actions;
