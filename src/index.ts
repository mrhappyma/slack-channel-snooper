import { App } from "@slack/bolt";
import env from "./env";

const app = new App({
  token: env.WORKSPACE_BOT_TOKEN,
  signingSecret: env.SIGNING_SECRET,
});
const people = env.ALERT_USER_ID.split(",");

app.event("channel_created", async ({ event, client }) => {
  for (const person of people) {
    await client.chat.postMessage({
      channel: person,
      text: `<#${event.channel.id}> created by <@${event.channel.creator}>`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `<#${event.channel.id}> (#${event.channel.name}) created by <@${event.channel.creator}>`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `<!subteam^S07MTSEBEK1>`,
            },
          ],
        },
      ],
    });
  }
});

app.start(3000);
app.client.chat.postMessage({
  channel: people[0],
  text: "wakey wakey",
});
