// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4368bcf0bc97e75758a39f24193d19e5@o4507433519742976.ingest.de.sentry.io/4507433522561104",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== "development",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
