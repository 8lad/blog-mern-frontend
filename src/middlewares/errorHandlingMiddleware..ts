import { isRejected, Middleware } from "@reduxjs/toolkit";

import { setErrorMessage } from "../redux/slices/errors";

export const errorHandlingMiddleware: Middleware =
	(store) => (next) => (action) => {
		if (isRejected(action)) {
			const storePartName = action.type.split("/")[0].toUpperCase();
			const errorMessage = `There's an error in ${storePartName}. Message: ${action.payload}`;
			store.dispatch(setErrorMessage(errorMessage));
		}
		next(action);
	};
