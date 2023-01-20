import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchRegister } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

export const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm({
		defaultValues: {
			email: "",
			passwordHash: "",
			fullName: ""
		},
		mode: "onChange"
	});

	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));

		if ("token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token);
		}
	};

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
					label="Полное имя"
					helperText={errors.fullName?.message}
					error={Boolean(errors.fullName?.message)}
					{...register("fullName", {
						required: "Please, enter your full name"
					})}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					helperText={errors.email?.message}
					error={Boolean(errors.email?.message)}
					{...register("email", { required: "Please, enter your email" })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Password"
					helperText={errors.passwordHash?.message}
					error={Boolean(errors.passwordHash?.message)}
					{...register("passwordHash", {
						required: "Please, enter new password"
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
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};
