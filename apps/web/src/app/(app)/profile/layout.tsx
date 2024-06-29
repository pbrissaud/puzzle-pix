import {ReactNode} from "react";
import ProfileNav from "../../../components/nav/profile-nav";
import { validateRequest } from "../../../server/auth";
import { redirect } from "next/navigation";

const ProfileLayout = async ({children}: { children: ReactNode }) => {

  const { user } = await validateRequest();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Profile</h1>
      </div>
      <div
        className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <ProfileNav/>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;