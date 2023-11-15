import { auth } from '@clerk/nextjs'
import { prisma } from './db'

interface GetUserByClerkId {
  include?: any
  select?: any
}

export const getUserByClerkId = async ({
  include = {},
  select = {},
}: GetUserByClerkId) => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  })

  return user
}
