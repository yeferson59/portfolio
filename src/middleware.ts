import { auth } from "@/auth";
import { defineMiddleware } from "astro:middleware";

// Authentication middleware
// Note: Astro's i18n middleware is automatically applied when i18n routing is configured
export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) return next();

  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  return next();
});
