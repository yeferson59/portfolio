import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { BD_URL, BETTER_AUTH_SECRET } from "astro:env/server";
import { BASE_URL } from "astro:env/client";

export const auth = betterAuth({
  database: new Pool({
    connectionString: BD_URL,
  }),
  baseURL: BASE_URL,
  secret: BETTER_AUTH_SECRET,
});
