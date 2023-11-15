import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()

  let href = userId ? '/dashboard' : '/sign-in'

  return (
    <main className="flex w-full h-screen items-center justify-center py-24 px-36 bg-slate-900 text-slate-50">
      <div className="w-full lg:w-2/3">
        <div className="my-4">
          <h1 className="text-6xl font-regular">Personal Dashboard</h1>
        </div>
        <div className="my-2">
          <h2 className="text-2xl font-thin text-slate-100">
            A dashboard to track the things I want to track
          </h2>
        </div>
        <div className="mt-4 py-3">
          <Link
            href={href}
            className="bg-slate-100 text-slate-900 text-3xl px-4 py-2 rounded-md font-regular"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  )
}
