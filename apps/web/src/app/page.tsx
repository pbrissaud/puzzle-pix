import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function HomePage() {

  return (
    <div>

      <LoginLink>Sign in</LoginLink>

      <RegisterLink>Sign up</RegisterLink>

      <LogoutLink>Sign out</LogoutLink>
    </div>
  );
}
