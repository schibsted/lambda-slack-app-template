const assert = require('assert');
const nock = require('nock');

const { handler } = require('../index');

describe('handler', () => {
  nock.disableNetConnect();

  it('returns HTTP 400 on invalid base64 in request body', async () => {
    const response = await handler({
      requestContext: {
        http: {
          method: "POST"
        }
      },
      isBase64Encoded: true,
      body: "{"
    });

    assert.equal(response.body, "Request body contains invalid Base64");
    assert.equal(response.statusCode, 400);
  });

  it('returns HTTP 400 on invalid JSON in request body', async () => {
    const response = await handler({
      requestContext: {
        http: {
          method: "POST"
        }
      },
      body: "{foo': bar"
    });

    assert.equal(response.body, "Request body contains invalid JSON");
    assert.equal(response.statusCode, 400);
  });

  it('responds to Slack API challenge', async () => {
    const response = await handler({
      requestContext: {
        http: {
          method: "POST"
        }
      },
      body: JSON.stringify({
        challenge: "foobar"
      })
    });

    assert.equal(response.body, "foobar");
    assert.equal(response.statusCode, 200);
  });

  it('responds to message events from Slack', async () => {
    nock("https://slack.com")
      .post('/api/chat.postMessage')
      .reply(200, {
        ok: true
      });

    const response = await handler({
      requestContext: {
        http: {
          method: "POST"
        }
      },
      body: JSON.stringify({
        event: {
          type: "message",
          subtype: "channel_join",
          text: "<@U023BECGF|bobby> has joined the channel",
          ts: "1403051575.000407",
          user: "U023BECGF"
        }
      })
    });

    assert.equal(response.body, "event received");
    assert.equal(response.statusCode, 200);
  });
});
