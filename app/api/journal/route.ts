import { analyzeJournalEntry } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId({})

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'How did your day go?',
    },
  })

  const analysis = await analyzeJournalEntry(entry.content)

  if (analysis) {
    await prisma.analysis.create({
      data: {
        entryId: entry.id,
        mood: analysis.mood,
        summary: analysis.summary,
        negative: analysis.negative,
        color: analysis.color,
      },
    })
  }
  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}
