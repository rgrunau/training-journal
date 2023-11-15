import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row lg:justify-between bg-gray-100/50">
      <aside className="w-1/4 grow-0 h-screen bg-blue-950 py-12 px-6 text-slate-50 flex flex-col">
        <header className="w-full mb-6">
          <h1 className="text-2xl font-regular">Dashboard</h1>
        </header>
        <nav className="w-full my-3">
          <ul className="flex flex-col">
            <li>
              <Link href="/journal" className="py-2">
                Journal
              </Link>
            </li>
          </ul>
        </nav>
        <div className="justify-self-end self-baseline">
          <UserButton />
        </div>
      </aside>
      <div className="w-2/3 py-12 px-4 grow">
        <main id="mainContent" className="w-full max-w-11/12 mx-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
