export const getArrayFromString = (data: string | string[]): string[] => {
	return Array.isArray(data) ? data : data.replaceAll(",", " ").split(" ");
};
