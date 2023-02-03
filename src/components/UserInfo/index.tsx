import React from "react";

import HackerAvatar from "../../assets/hacker.png";
import { formatDate } from "../../utils/formatDate";

import styles from "./UserInfo.module.scss";

interface UserInfoProps {
	fullName: string;
	additionalText?: string;
	avatarUrl?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({
	avatarUrl,
	fullName,
	additionalText,
}) => {
	const createdAtText = additionalText
		? formatDate(additionalText)
		: "No data";

	return (
		<div className={styles.root}>
			<img
				className={styles.avatar}
				src={avatarUrl ? avatarUrl : HackerAvatar}
				alt={
					avatarUrl
						? fullName
						: " < a href=https://www.flaticon.com/free-icons/hacker title=hacker icons>Hacker icons created by Freepik - Flaticon</>"
				}
				onError={(
					event: React.SyntheticEvent<HTMLImageElement, Event>
				) => ((event.target as HTMLImageElement).src = HackerAvatar)}
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
