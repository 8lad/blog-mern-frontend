import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
import { FullPost } from "./pages/FullPost/FullPost";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { NotFound } from "./pages/NotFound/NotFound";
import { Registration } from "./pages/Registration/Registration";
import { TagSortedPostsPage } from "./pages/TagSortedPostsPage/TagSortedPostsPage";
import { fetchAuthMe } from "./redux/slices/auth";
import { RootState, useAppDispatch } from "./redux/store";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
	const dispatch = useAppDispatch();
	const notify = (message: string) => toast(message);
	const { errorMessage } = useSelector((state: RootState) => state.errors);

	useEffect(() => {
		errorMessage && notify(errorMessage);
	}, [errorMessage]);

	useEffect(() => {
		if ("token-mern" in localStorage) {
			dispatch(fetchAuthMe());
		}
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
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
};
