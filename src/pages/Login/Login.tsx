import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
	fetchAuth,
	selectIsAuth,
	userAuthInputData,
} from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.scss";

export const Login = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	const { errorMessage } = useAppSelector((state) => state.auth);
	const notify = (message: string) => toast(message);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			passwordHash: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (values: userAuthInputData) => {
		const data = await dispatch(fetchAuth(values));
		if (!data.payload) {
			notify("Incorrect password");
		}

		if (typeof data.payload === "object" && "token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token as string);
		}
	};

	useEffect(() => {
		errorMessage && notify("Wrong authorization data");
	}, [errorMessage]);

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<Paper classes={{ root: styles.root }}>
				<Typography classes={{ root: styles.title }} variant="h5">
					Login to account
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						className={styles.field}
						label="E-Mail"
						type="email"
						{...register("email", {
							required: "Please, type email",
						})}
						error={Boolean(errors.email?.message)}
						helperText={errors.email?.message}
						fullWidth
					/>
					<TextField
						className={styles.field}
						type="password"
						label="Password"
						error={Boolean(errors.passwordHash?.message)}
						helperText={errors.passwordHash?.message}
						{...register("passwordHash", {
							required: "Please, type password",
						})}
						fullWidth
					/>
					<Button
						size="large"
						type="submit"
						variant="contained"
						disabled={!isValid}
						fullWidth
					>
						Log in
					</Button>
				</form>
			</Paper>
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
