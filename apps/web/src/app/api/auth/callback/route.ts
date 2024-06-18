import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";
import db from "../../../../server/mongo";
import {analytics} from "../../../../server/analytics";

export async function GET() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) return NextResponse.redirect(process.env.KINDE_SITE_URL + "/")

  const dbUser = await db.user.findFirst({
    where: {
      authId: user.id
    }
  });

  if (!dbUser) {
    await db.user.create({
      data: {
        authId: user.id,
        name: user.given_name + " " + user.family_name,
      }
    });
    analytics.capture({event: "user_signed_up", distinctId: user.id, properties: {}});
  } else {
    await db.user.update({
      where: {
        authId: user.id
      },
      data: {
        lastLoginDate: new Date()
      }
    });
    analytics.capture({event: "user_logged_in", distinctId: user.id});
  }

  return NextResponse.redirect(process.env.KINDE_SITE_URL + "/rooms");
}
