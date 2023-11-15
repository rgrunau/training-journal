import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center lg:items-start py-24 px-36 bg-slate-900 text-slate-50">
      <div className="w-full lg:w-1/3">
        <h1 className="text-7xl">Hippy Training Journal</h1>
      </div>
      <div className="text-5xl lg:w-2/3">
        <p>
          An ai backed Training Journal for people who like to talk about their
          feelings.
        </p>
      </div>
      <div className="mt-4 py-3">
        <Link
          href="/login"
          className="bg-slate-700 hover:bg-slate-800 text-slate-50 text-3xl px-4 py-2 rounded-md border-2 border-slate-50"
        >
          Get Started
        </Link>
      </div>
    </main>
  )
}
