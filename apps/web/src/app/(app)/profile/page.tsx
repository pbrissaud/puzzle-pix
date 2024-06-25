import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@ui/components/ui/card";
import {Input} from "@ui/components/ui/input";
import {Button} from "@ui/components/ui/button";

const ProfilePage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Name</CardTitle>
        <CardDescription>
          Used to identify you in the app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input placeholder="Store Name"/>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}

export default ProfilePage;