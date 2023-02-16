import React from "react";
import { Link } from "react-router-dom";

import NotFoundImage from "../../assets/404.jpg";

import style from "./NotFound.module.scss";

export const NotFound: React.FC = () => {
	return (
		<div className={style.root}>
			<img
				src={NotFoundImage}
				alt="Image downloaded from the https://www.vecteezy.com/vector-art"
			/>
			<Link className={style.link} to="/">
				Go back
			</Link>
		</div>
	);
};
