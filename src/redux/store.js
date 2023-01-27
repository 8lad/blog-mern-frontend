import { configureStore } from "@reduxjs/toolkit";

import { rootReducer as reducer } from "./rootReducer";

const store = configureStore({
	reducer,
});

export default store;
