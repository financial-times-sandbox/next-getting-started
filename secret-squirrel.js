module.exports = {
	files: {
		allow: [
			'.nvmrc'
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'8b89e580-d088-11e8-9a46-9dacf2022f13', // README.md:7
			'd3107180-d088-11e8-991b-656603d96086', // README.md:9
			'adam@braimbridge\\.com' // package.json:5
		]
	}
};
