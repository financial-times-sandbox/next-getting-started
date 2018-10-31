// For more information about testing with Jest see:
// https://facebook.github.io/jest/
const { Application } = require('probot')
const myProbotApp = require('..')

const installationRepositoriesAddedPayload = require('./fixtures/installation_repositories.added.json')

describe('The next-getting-started GitHub application instance', () => {
  let app; let github

  beforeEach(() => {
    app = new Application()
    app.load(myProbotApp)
    // Mock the GitHub API
    github = {
      issues: {
        create: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    // Passes the mocked out GitHub API into out app instance
    app.auth = () => Promise.resolve(github)
  })

  test('creates an issue when a repository is added to the next-getting-started GitHub application instance', async () => {
    // Simulates delivery of a installation_repositories webhook
    await app.receive({
      name: 'installation_repositories',
      payload: installationRepositoriesAddedPayload
    })
    expect(github.issues.create).toHaveBeenCalled()
  })
})
