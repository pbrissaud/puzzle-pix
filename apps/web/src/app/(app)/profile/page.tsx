import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@ui/components/ui/card";
import { validateRequest } from "../../../server/auth";
import UpdateUsernameForm from "../../../components/forms/update-username-form";

const ProfilePage = async () => {
  const { user } = await validateRequest()

  if (!user) {
    return null
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Name</CardTitle>
        <CardDescription>
          Used to identify you in the app
        </CardDescription>
      </CardHeader>
      <CardContent>
          <UpdateUsernameForm username={user.name} />
      </CardContent>
    </Card>
  )
}

export default ProfilePage;