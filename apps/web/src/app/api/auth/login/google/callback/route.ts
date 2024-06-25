import { cookies } from "next/headers";
import { google } from "../../../../../../lib/lucia";
import { OAuth2RequestError } from "arctic";
import { processLogin } from "../../../../../../server/auth";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const codeVerifier = cookies().get("google_oauth_code_verifier")?.value ?? null;
  const storedState = cookies().get("google_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const { accessToken } = await google.validateAuthorizationCode(code, codeVerifier);

    const googleRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const googleUser = await googleRes.json() as GoogleUser;

    return processLogin({ name: googleUser.name, email: googleUser.email, imgUrl: googleUser.picture }, "google");
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

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}