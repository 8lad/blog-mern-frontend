import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import {
	APP_ROUTE_POSTS,
	APP_ROUTE_EDIT_POST,
	APP_ROUTE_ROOT
} from "./constants";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, [dispatch]);

	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path={APP_ROUTE_ROOT} element={<Home />} />
					<Route path={`${APP_ROUTE_POSTS}/:id`} element={<FullPost />} />
					<Route
						path={`${APP_ROUTE_POSTS}/:id/${APP_ROUTE_EDIT_POST}`}
						element={<AddPost />}
					/>
					<Route path="/add-post" element={<AddPost />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
