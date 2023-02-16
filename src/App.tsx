import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components/Header/Header";
import {
	APP_ROUTE_ADD_POST,
	APP_ROUTE_EDIT_POST,
	APP_ROUTE_LOGIN,
	APP_ROUTE_POSTS,
	APP_ROUTE_REGISTER,
	APP_ROUTE_ROOT,
	APP_ROUTE_TAGS,
} from "./constants/routes";
import { AddPost } from "./pages/AddPost/AddPost";
import { FullPost } from "./pages/FullPost";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/Login";
import { NotFound } from "./pages/NotFound/NotFound";
import { Registration } from "./pages/Registration/Registration";
import { TagSortedPostsPage } from "./pages/TagSortedPostsPage";
import { fetchAuthMe } from "./redux/slices/auth";
import { useAppDispatch } from "./redux/store";

export const App = () => {
	const dispatch = useAppDispatch();

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
					<Route
						path={`${APP_ROUTE_TAGS}/:tag`}
						element={<TagSortedPostsPage />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</>
	);
};
