import { generateState } from "arctic";
import { twitch } from "../../../../../lib/lucia";
import { cookies } from "next/headers";

export const GET = async () => {
  const state = generateState();
  const url = await twitch.createAuthorizationURL(state, {
    scopes: ["user:read:email"],
  });
  
  cookies().set("twitch_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}