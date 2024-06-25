import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { twitch } from "../../../../../../lib/lucia";
import { OAuth2RequestError } from "arctic";
import { processLogin } from "../../../../../../server/auth";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("twitch_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await twitch.validateAuthorizationCode(code);
    const twitchUserResponse = await fetch(
      "https://api.twitch.tv/helix/users",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Client-ID": process.env.TWITCH_CLIENT_ID!,
        },
      }
    );
    const twitchUser = await twitchUserResponse.json();
    return processLogin({ name: twitchUser.data[0].display_name, email: twitchUser.data[0].email, imgUrl: twitchUser.data[0].profile_image_url }, "twitch");
  } catch (e) {
    console.log(e);
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}