/* eslint-disable no-console */

/**
 * @param {import('probot').Application} app - Probot's Application class.
 * See: https://probot.github.io/docs/development/
 */

const validator = require('is-my-json-valid');
const config = require('./schemas/config.schema.json');
const validate = validator(config, {
	verbose: true
});

module.exports = app => {
	app.on('installation_repositories', async context => {
		if (validate(context.payload)) {
			return Promise.all(context.payload.repositories_added.map(repository => {
				const [owner, repo] = repository.full_name.split('/');
				const payload = {
					owner: owner,
					repo: repo,
					title: 'Next-initializer was installed.',
					body: 'This is a new issue.'
				}
				console.log('Creating issue:',payload)
				return context.github.issues.create(payload)
			}))
		} else {
			console.log(validate.errors);
		}
	});
};
