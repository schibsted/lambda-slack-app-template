const { WebClient: Slack } = require("@slack/web-api");

const { parseSlackPayload } = require('./src/utils');

const slack = new Slack(process.env.SLACK_TOKEN);

exports.handler = async (event, context) => {
  console.log(event);

  if (event.requestContext.http.method == "POST") {
    try {
      json = parseSlackPayload(event);
    } catch (error) {
      response = {
        statusCode: 400,
        body: error
      }

      console.log(response);
      return response;
    }

    // When you configure your Slack app to listen to events,
    // it'll send a challenge to your app to verify it's really you
    if (json.challenge) {
      let response = {
        statusCode: 200,
        body: json.challenge
      };

      console.log(response);
      return response;
    }

    // Your app's code will typically go below this fold. This is just 
    // an example to get you started.
    if (json.event.type == "message") {
      await slack.chat.postMessage({
        channel: json.event.channel_id,
        text: "Hey, I heard that!"
      });

      let response = {
        statusCode: 200,
        body: "event received"
      }

      console.log(response);
      return response;
    };
  }
}

