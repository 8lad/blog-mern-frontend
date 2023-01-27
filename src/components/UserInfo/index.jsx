import React from "react";

import HackerAvatar from "../../assets/hacker.png";
import { formatDate } from "../../utils/formatDate";

import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
	const createdAtText = formatDate(additionalText);

	return (
		<div className={styles.root}>
			<img
				className={styles.avatar}
				src={avatarUrl ? avatarUrl : HackerAvatar}
				alt={
					avatarUrl
						? fullName
						: " < a href=\"https://www.flaticon.com/free-icons/hacker\" title=\"hacker icons\">Hacker icons created by Freepik - Flaticon</>"
				}
				onError={(e) => e.target.src = HackerAvatar}
			/>
			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>
				<span className={styles.additional}>
					Created: {createdAtText}
				</span>
			</div>
		</div>
	);
};
