export default function NewEntryPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full">
      <div>{params.id}</div>
    </div>
  )
}
