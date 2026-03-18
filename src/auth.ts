import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { BD_URL } from "astro:env/server";

export const auth = betterAuth({
  database: new Pool({
    connectionString: BD_URL,
  }),
});
