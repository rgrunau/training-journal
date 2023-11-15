import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import EntryCard from '@/components/journal/entryCard'
import AddNewEntryCard from '@/components/journal/addNewEntryCard'
import Link from 'next/link'

const getJournalEntries = async () => {
  const user = await getUserByClerkId({})
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

export default async function JournalPage() {
  const entries = await getJournalEntries()
  return (
    <div>
      <h1>Journal</h1>
      <div className="grid grid-cols-3 gap-4 py-4 px-2 mt-4">
        <AddNewEntryCard />
        {entries.length > 0 &&
          entries.map((entry) => (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
              <EntryCard entry={entry || {}} />
            </Link>
          ))}
        {entries.length === 0 && <p>Write a journal to get started</p>}
      </div>
    </div>
  )
}
