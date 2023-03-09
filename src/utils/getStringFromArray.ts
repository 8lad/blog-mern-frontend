export const getStringFromArray = (data: string | string[]): string => {
	return Array.isArray(data) ? data.join(" ") : data;
};
