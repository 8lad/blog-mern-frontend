import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import { fetchAuthMe } from "./redux/slices/auth";
import { Header } from "./components";
import {
	APP_ROUTE_ADD_POST,
	APP_ROUTE_EDIT_POST,
	APP_ROUTE_LOGIN,
	APP_ROUTE_POSTS,
	APP_ROUTE_REGISTER,
	APP_ROUTE_ROOT,
} from "./constants";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, [dispatch]);

	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path={APP_ROUTE_ROOT} element={<Home />} />
					<Route
						path={`${APP_ROUTE_POSTS}/:id`}
						element={<FullPost />}
					/>
					<Route
						path={`${APP_ROUTE_POSTS}/:id${APP_ROUTE_EDIT_POST}`}
						element={<AddPost />}
					/>
					<Route path={APP_ROUTE_ADD_POST} element={<AddPost />} />
					<Route path={APP_ROUTE_LOGIN} element={<Login />} />
					<Route
						path={APP_ROUTE_REGISTER}
						element={<Registration />}
					/>
				</Routes>
			</Container>
		</>
	);
}

export default App;
