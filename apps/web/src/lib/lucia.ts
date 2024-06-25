import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import db from "../server/mongo";
import {Lucia} from "lucia";
import {GitHub, Google, Twitch} from "arctic";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      name: attributes.name,
      email: attributes.email,
      picture: attributes.picture,
    };
  },
})
// IMPORTANT!
declare module "lucia" {
  // eslint-disable-next-line no-unused-vars
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
  email: string;
  picture: string;
}

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!
);

export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.NEXT_PUBLIC_APP_URL! + "/api/auth/login/google/callback");

export const twitch = new Twitch(process.env.TWITCH_CLIENT_ID!, process.env.TWITCH_CLIENT_SECRET!, process.env.NEXT_PUBLIC_APP_URL! + "/api/auth/login/twitch/callback");
