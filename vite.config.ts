import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
	build: {
		outDir: "build",
	},
	server: {
		open: true,
		port: 4000,
	},
	resolve: {
		alias: {
			"@okta/okta-auth-js": "@okta/okta-auth-js/dist/okta-auth-js.umd.js",
		},
	},
});
