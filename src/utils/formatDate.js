export const formatDate = (date) => {
	if (!date.includes("T")) return date;
	return date.replace("T", ", ").replace(/:[0-9]+.[0-9]+[a-zA-z]{1}$/gm, "");
};
