import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { setPostSorting } from "../../redux/slices/posts";

export const CustomTabs = () => {
	const dispatch = useDispatch();
	const { sorting } = useSelector(state => state.posts.posts);
	const sortingValue = sorting === "new" ? 0 : 1;

	return (
		<Tabs
			style={{ marginBottom: 15 }}
			value={sortingValue}
			aria-label="basic tabs example"
		>
			<Tab label="New" onClick={() => dispatch(setPostSorting("new"))} />
			<Tab label="Popular" onClick={() => dispatch(setPostSorting("popular"))} />
		</Tabs>
	);
};
