import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";

import {
	fetchAvatarUrl,
	fetchRegister,
	removeAvatarImage,
	selectIsAuth,
	userSingInData,
} from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import styles from "./Registration.module.scss";

export const Registration = () => {
	const schema = yup
		.object({
			email: yup
				.string()
				.trim()
				.required("This field is required")
				.email("Please enter valid email"),
			fullName: yup
				.string()
				.trim()
				.required("This field is required")
				.min(2, "You should put more letters"),
			passwordHash: yup
				.string()
				.trim()
				.required("This field is required")
				.min(6, "The password should be more than 6 letters")
				.matches(/[a-z]+/, "One lowercase character")
				.matches(/[A-Z]+/, "One uppercase character")
				.matches(/[@$!%*#?&]+/, "One special character")
				.matches(/\d+/, "One number"),
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
			fullName: "",
		},
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	const {
		errorMessage,
		data: { avatarUrl },
	} = useAppSelector((state) => state.auth);
	const notify = (message: string) => toast(message);

	const isAuth = useAppSelector(selectIsAuth);
	const dispatch = useAppDispatch();
	const inputFileRef = useRef<null | HTMLInputElement>(null);

	const onSubmit = async (values: userSingInData) => {
		const allUserData = { ...values, avatarUrl };
		const data = await dispatch(fetchRegister(allUserData));

		if (typeof data.payload === "object" && "token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token as string);
		}
	};

	const onClickAvatar = () => {
		inputFileRef.current ? inputFileRef.current.click() : false;
	};
	const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const formData = new FormData();
		if (event.target.files) {
			const file = event.target.files[0];
			formData.append("image", file);
			dispatch(fetchAvatarUrl(formData));
		}
	};

	const avatarImage = avatarUrl
		? `${import.meta.env.VITE_API_URL}${avatarUrl}`
		: "";

	useEffect(() => {
		errorMessage && notify("Wrong authorization data");
	}, [errorMessage]);

	useEffect(() => {
		dispatch(removeAvatarImage);
	}, [dispatch]);

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Account creating
			</Typography>
			<div className={styles.avatar}>
				<Avatar
					sx={{ width: 100, height: 100, cursor: "pointer" }}
					onClick={onClickAvatar}
					src={avatarImage}
				/>
				<input
					type="file"
					ref={inputFileRef}
					onChange={handleChangeFile}
					hidden
				/>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="Full name"
					helperText={errors.fullName?.message}
					error={Boolean(errors.fullName?.message)}
					{...register("fullName")}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					helperText={errors.email?.message}
					error={Boolean(errors.email?.message)}
					{...register("email")}
					fullWidth
				/>
				<TextField
					className={styles.field}
					type="password"
					label="Password"
					helperText={errors.passwordHash?.message}
					error={Boolean(errors.passwordHash?.message)}
					{...register("passwordHash")}
					fullWidth
				/>
				<Button
					type="submit"
					size="large"
					variant="contained"
					fullWidth
				>
					Sing in
				</Button>
			</form>
		</Paper>
	);
};
