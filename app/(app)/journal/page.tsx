import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import EntryCard from '@/components/journal/entryCard'
import AddNewEntryCard from '@/components/journal/addNewEntryCard'

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
  console.log(entries)
  return (
    <div>
      <h1>Journal</h1>
      <div className="w-full flex flex-wrap items-center justify-start py-4 px-2 mt-4">
        <div className="w-1/3">
          <AddNewEntryCard />
        </div>
      </div>
      {entries.length > 0 && (
        <ul>
          {entries.map((entry) => (
            <EntryCard key={entry.id || ''} entry={entry || {}} />
          ))}
        </ul>
      )}
      {entries.length === 0 && <p>Write a journal to get started</p>}
    </div>
  )
}
