"use server";

import { type Session, type User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "../lib/lucia";
import db from "./mongo";
import { analytics } from "./analytics";

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }
);

export const processLogin = async (user: { name: string, email: string, imgUrl: string }, provider: string)  => {
  const existingUser = await db.user.findUnique({
    where: {
      email: user.email
    },
  });

  if (existingUser) {
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    await db.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        lastLoginDate: new Date(),
      },
    })

    analytics.capture({
      event: "user_logged_in", distinctId: existingUser.id, properties: {
        authProvider: provider
      }
    });


    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const newUser = await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      picture: user.imgUrl,
    },
  });
  const session = await lucia.createSession(newUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  analytics.capture({
    event: "user_signed_up", distinctId: newUser.id, properties: {
      authProvider: provider
    }
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/rooms",
    },
  });
}