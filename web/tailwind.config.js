/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				"loading-bar": {
					"0%": { width: "0%" },
					"100%": { width: "100%" },
				},
			},
			animation: {
				"loading-bar": "loading-bar 2s linear forwards",
			},
		},
	},
	plugins: [],
};
