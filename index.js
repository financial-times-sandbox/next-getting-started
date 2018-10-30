/* eslint-disable no-console */

/**
 * @param {import('probot').Application} app - Probot's Application class.
 * See: https://probot.github.io/docs/development/
 */

const isValid = context => {
	if (!context.payload) {
		return false;
	}
	if (!context.payload.action || context.payload.action !=='added') {
		return false;
	}
	if (!context.payload.installation) {
		return false;
	}
	if (!context.payload.installation.id || context.payload.installation.id !== 422790) {
		return false;
	}
	if (!context.payload.repositories_added || !Array.isArray(context.payload.repositories_added) || !context.payload.repositories_added.length > 0) {
		return false;
	}
	return true;
}

module.exports = app => {
	app.on('installation_repositories', async context => {
		if (isValid(context)) {
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
			console.log('Context was not valid.');
		}
	})
}
