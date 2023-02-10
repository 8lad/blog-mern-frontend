import { useEffect, useState } from "react";

interface ScreenSizes {
	screenWidth: undefined | number;
	screenHeight: undefined | number;
}

export const useScreenSize = () => {
	const [screenSizes, setScreenSizes] = useState<ScreenSizes>({
		screenWidth: undefined,
		screenHeight: undefined,
	});

	const sizeHandler = () => {
		setScreenSizes({
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth,
		});
	};

	useEffect(() => {
		window.addEventListener("resize", sizeHandler);
		sizeHandler();
		return () => window.removeEventListener("resize", sizeHandler);
	}, []);

	return screenSizes;
};
