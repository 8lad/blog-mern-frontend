import NoImage from "../assets/hacker.png";

export const getImageUrl = (imageUrl: string): string => {
	return imageUrl ? `${import.meta.env.VITE_API_URL}${imageUrl}` : NoImage;
};
