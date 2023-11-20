import { App } from "@slack/bolt";
import env from "./env";

const app = new App({
  token: env.WORKSPACE_BOT_TOKEN,
  signingSecret: env.SIGNING_SECRET,
});

app.event("channel_created", async ({ event, client }) => {
  await client.chat.postMessage({
    channel: env.ALERT_USER_ID,
    text: `<#${event.channel.id}>`,
  });
});

app.start(3000);
app.client.chat.postMessage({
  channel: env.ALERT_USER_ID,
  text: "wakey wakey",
});
