"use server"

import { updateUsernameSchema } from "./api/schemas"
import { validateRequest } from "./auth"
import db from "./mongo"

export const updateUsername = async (formData: FormData) => {
  const { user } = await validateRequest()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const data = updateUsernameSchema.parse({
    username: formData.get('username')
  })

  return db.user.update({
    where: {
      id: user.id
    },
    data: {
      name: data.username
    }
  })
}