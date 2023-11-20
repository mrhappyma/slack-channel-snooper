import { z } from "zod";

const envSchema = z.object({
  WORKSPACE_BOT_TOKEN: z.string(),
  SIGNING_SECRET: z.string(),
  ALERT_USER_ID: z.string(),
});
export default envSchema.parse(process.env);
