import { cookies } from "next/headers";
import {lucia} from "../../../../lib/lucia";
import {redirect} from "next/navigation";
import {validateRequest} from "../../../../server/auth";

export const GET = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};