import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
	fetchRegister,
	selectIsAuth,
	userSingInData,
} from "../../redux/slices/auth";
import { RootState, useAppDispatch } from "../../redux/store";

import styles from "./Login.module.scss";

export const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			passwordHash: "",
			fullName: "",
		},
		mode: "onChange",
	});

	const { errorMessage } = useSelector((state: RootState) => state.auth);
	const notify = (message: string) => toast(message);

	const isAuth = useSelector(selectIsAuth);
	const dispatch = useAppDispatch();

	const onSubmit = async (values: userSingInData) => {
		const data = await dispatch(fetchRegister(values));

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
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="Full name"
					helperText={errors.fullName?.message}
					error={Boolean(errors.fullName?.message)}
					{...register("fullName", {
						required: "Please, enter your full name",
					})}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					helperText={errors.email?.message}
					error={Boolean(errors.email?.message)}
					{...register("email", {
						required: "Please, enter your email",
					})}
					fullWidth
				/>
				<TextField
					className={styles.field}
					type="password"
					label="Password"
					helperText={errors.passwordHash?.message}
					error={Boolean(errors.passwordHash?.message)}
					{...register("passwordHash", {
						required: "Please, enter new password",
					})}
					fullWidth
				/>
				<Button
					type="submit"
					size="large"
					variant="contained"
					disabled={!isValid}
					fullWidth
				>
					Sing in
				</Button>
			</form>
		</Paper>
	);
};
