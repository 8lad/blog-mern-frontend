import React from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";

import {
	fetchAuth,
	selectIsAuth,
	userAuthInputData,
} from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import styles from "./Login.module.scss";

export const Login = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	const schema = yup
		.object({
			email: yup
				.string()
				.trim()
				.email("Please enter correct email")
				.required("This field is required"),
			passwordHash: yup
				.string()
				.trim()
				.required("This field is required"),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			passwordHash: "",
		},
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	const onSubmit = async (values: userAuthInputData) => {
		const data = await dispatch(fetchAuth(values));

		if (typeof data.payload === "object" && "token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token as string);
		}
	};

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
						{...register("email")}
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
						{...register("passwordHash")}
						fullWidth
					/>
					<Button
						size="large"
						type="submit"
						variant="contained"
						fullWidth
					>
						Log in
					</Button>
				</form>
			</Paper>
		</>
	);
};
