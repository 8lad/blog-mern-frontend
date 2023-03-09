import { isRejected, Middleware } from "@reduxjs/toolkit";

import { setErrorMessage } from "../redux/slices/errors";

export const errorHandlingMiddleware: Middleware =
	(store) => (next) => (action) => {
		if (isRejected(action)) {
			const storePartName = action.type.split("/")[0].toUpperCase();
			const errorText =
				"error" in action ? action.error.message : action.payload;
			const errorMessage = `There's an error in ${storePartName}. Message: ${errorText}`;
			store.dispatch(setErrorMessage(errorMessage));
		}
		return next(action);
	};
