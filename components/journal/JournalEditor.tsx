'use client'
import { updateJournalEntry } from '@/utils/api'
import { useEffect, useRef, useState } from 'react'
import { useAutosave } from 'react-autosave'

export default function JournalEditor({ entry }) {
  const [value, setValue] = useState(entry?.content)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const editor = editorRef.current
    if (editor) {
      editor.focus()
    }
  }, [])

  useAutosave({
    data: value,
    interval: 5000,
    onSave: async (_value) => {
      setIsLoading(true)
      const updatedEntry = await updateJournalEntry(entry.id, _value)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isLoading && <div>Saving your entry...</div>}
      <label className="sr-only" htmlFor="journalEditor">
        Journal Editor
      </label>
      <textarea
        name="journalEditor"
        id="journalEditor"
        value={value}
        ref={editorRef}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-full resize-none border-1 focus:border-blue-300 px-2 py-8 text-xl rounded-md"
      />
    </div>
  )
}
