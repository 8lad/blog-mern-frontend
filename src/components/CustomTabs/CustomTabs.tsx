import React from "react";
import { useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { setPostSorting } from "../../redux/slices/posts";
import { RootState, useAppDispatch } from "../../redux/store";

export const CustomTabs: React.FC = () => {
	const dispatch = useAppDispatch();
	const { sorting } = useSelector((state: RootState) => state.posts.posts);
	const sortingValue: number = sorting === "new" ? 0 : 1;

	return (
		<Tabs
			style={{ marginBottom: 15 }}
			value={sortingValue}
			aria-label="basic tabs example"
		>
			<Tab label="New" onClick={() => dispatch(setPostSorting("new"))} />
			<Tab
				label="Popular"
				onClick={() => dispatch(setPostSorting("popular"))}
			/>
		</Tabs>
	);
};
