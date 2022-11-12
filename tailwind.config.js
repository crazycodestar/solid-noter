/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				Montserrat: ["Montserrat", "sans-serif"],
				Source_Sans_Pro: ["Source_Sans_Pro", "sans-serif"],
				Roboto: ["Roboto", "sans-serif"],
				Raleway: ["Raleway", "sans-serif"],
			},
		},
	},
	plugins: [],
};
