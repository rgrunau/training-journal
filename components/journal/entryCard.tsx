const EntryCard = ({ entry }: { entry: Entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="w-[300px] rounded-md shadow-md flex flex-col">
      <div className="p-4">
        <h2 className="text-xl text-slate-900">{date}</h2>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="p-4 text-slate-700">summary</p>
        </div>
        <div>
          <p className="p-4 text-slate-700">rating</p>
        </div>
      </div>
    </div>
  )
}

export default EntryCard
