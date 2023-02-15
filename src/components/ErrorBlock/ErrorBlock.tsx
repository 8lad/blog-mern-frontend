import React from "react";
import { Typography } from "@mui/material";

import ErrorImage from "../../assets/error-img.jpg";

import style from "./ErrorBlock.module.scss";

interface ErrorBlockProps {
	title: string;
}

export const ErrorBlock: React.FC<ErrorBlockProps> = ({ title }) => {
	return (
		<div className={style.root}>
			<img
				src={ErrorImage}
				alt="<a href=https://www.freepik.com/free-vector/alert-concept-illustration_5423412.htm#query=error&position=7&from_view=search&track=sph>Image by storyset</a> on Freepik"
			/>
			<Typography
				variant="h2"
				component="h2"
				sx={{ textAlign: "center" }}
			>
				{title}
			</Typography>
		</div>
	);
};
