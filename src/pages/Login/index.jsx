import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.scss";

export const Login = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const notify = () => toast("Authorization error");

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

	const onSubmit = (values) => {
		const data = dispatch(fetchAuth(values));
		if (!data.payload) {
			notify();
		}

		if ("token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token);
		}
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<Paper classes={{ root: styles.root }}>
				<Typography classes={{ root: styles.title }} variant="h5">
					Вход в аккаунт
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						className={styles.field}
						label="E-Mail"
						type="email"
						{...register("email", { required: "Please, type email" })}
						error={Boolean(errors.email?.message)}
						helperText={errors.email?.message}
						fullWidth
					/>
					<TextField
						className={styles.field}
						label="Пароль"
						error={Boolean(errors.password?.message)}
						helperText={errors.password?.message}
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
						Войти
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
