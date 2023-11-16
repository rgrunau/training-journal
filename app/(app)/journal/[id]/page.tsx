import { prisma } from '@/utils/db'
import JournalEditor from '@/components/journal/JournalEditor'

const getJournalEntry = async (id: string) => {
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id,
    },
  })

  return entry
}

export default async function NewEntryPage({
  params,
}: {
  params: { id: string }
}) {
  const entry = await getJournalEntry(params.id)
  return (
    <div className="w-full">
      <JournalEditor entry={entry} />
    </div>
  )
}
