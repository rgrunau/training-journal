import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
const createNewUser = async () => {
  debugger
  const clerkUser = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser?.id as string,
    },
  })

  if (!match) {
    const createUser = await prisma.user.create({
      data: {
        clerkId: clerkUser?.id as string,
        email: clerkUser?.emailAddresses[0].emailAddress as string,
        firstName: clerkUser?.firstName as string,
        lastName: clerkUser?.lastName as string,
      },
    })
    if (createUser) {
      console.log('user created')
    }
  }
  redirect('/dashboard')
}

export default async function NewUserPage() {
  await createNewUser()
  return <div>new user page</div>
}
