import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import {
	APP_ROUTE_ADD_POST,
	APP_ROUTE_LOGIN,
	APP_ROUTE_REGISTER,
	APP_ROUTE_ROOT,
} from "../../constants";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const dispatch = useAppDispatch();

	const onClickLogout = () => {
		dispatch(logout());
		window.localStorage.removeItem("token");
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to={APP_ROUTE_ROOT}>
						<div>MERN BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to={APP_ROUTE_ADD_POST}>
									<Button variant="contained">
										Write a post
									</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Log out
								</Button>
							</>
						) : (
							<>
								<Link to={APP_ROUTE_LOGIN}>
									<Button variant="outlined">Log in</Button>
								</Link>
								<Link to={APP_ROUTE_REGISTER}>
									<Button variant="contained">Sing in</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
