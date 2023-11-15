'use client'
import { createNewJournalEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const AddNewEntryCard = () => {
  const router = useRouter()
  const handleClick = async () => {
    const newEntry = await createNewJournalEntry()
    router.push(`/journal/${newEntry.id}`)
  }

  return (
    <div
      className="w-[300px] py-4 px-2 rounded-md shadow-md flex flex-col items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <div></div>
      <div>
        <h1>Add New Entry</h1>
      </div>
    </div>
  )
}

export default AddNewEntryCard
