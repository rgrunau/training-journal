import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import JournalEditor from '@/components/journal/JournalEditor'
import { analyzeJournalEntry } from '@/utils/ai'

const getJournalEntry = async (id: string) => {
  const user = await getUserByClerkId({})
  const entry = await prisma.journalEntry.findUnique({
    where: {
      // this is how you query on a compound key
      userId_id: {
        userId: user.id,
        id,
      },
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
  const analysisData = [
    { name: 'Summary', value: 'This is a summary' },
    { name: 'Subject', value: 'This is a Subject' },
    { name: 'Sentiment', value: 'This is a Sentiment' },
    { name: 'Negative', value: 'This is a Emotion' },
  ]
  return (
    <div className="w-ful h-full flex items-start justify-between">
      <div className="w-2/3 h-full">
        <JournalEditor entry={entry} />
      </div>
      <div className="w-1/4 h-full border-l-2 border-gray-400/50">
        <div className="w-full px-6 py-12 bg-slate-400/50">
          <h2>Analysis</h2>
        </div>
        <div>
          <ul className="flex flex-col">
            {analysisData.map((data) => (
              <li
                key={data.name}
                className="border-b-1 border-t-2 border-gray-400/50"
              >
                <div className="flex justify-between px-2 py-4">
                  <span className="text-lg font-regular">{data.name}</span>
                  <span>{data.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
